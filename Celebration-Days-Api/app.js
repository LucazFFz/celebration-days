const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const PORT = process.env.PORT || 3000;

const app = express();

app.get("/", (req, res) => {
    console.log("Received a http get request...")
    
    // CONTROL WHICH FETCH TYPE
    if(req.query.fetch === "main") hero();
    else if(req.query.fetch === "all") all();
    else {
        res.status(400);
        res.send({msg: "Fetch method not found.", status: 400});
    }
    
    // SEND ALL CELEBRATION DAYS
    async function hero() {
        const resolve = await fetchMain(req.query.date).catch((error) => {
            res.status(400);
            res.send({ msg: error, status: 400 });
        })
        res.send(JSON.stringify(resolve));
    };

    // SEND MAIN CELEBRATION DAY
    async function all() {
        const resolve = await fetchAll(req.query.date).catch((error) => {
            res.status(400);
            res.send({ msg: error, status: 400 });
        })
        res.send(JSON.stringify(resolve));
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`))

// FETCHES ALL CELEBRATION DAYS FROM https://www.daysoftheyear.com/.
async function fetchAll(date) {
    const url = `https://www.daysoftheyear.com/days/${date}/`; 

    const response = await axios.get(url).catch(() => {
        return Promise.reject("Date not found");
    })

    const html = response.data;
    const $ = cheerio.load(html);
    
    // SCRAPE ELEMENTS
    let info = []
    $(".section--group").first().find(".card--day").each(function() { 
        const title = $(this).find(".card__title").find("a").text();
        const img = $(this).find(".card__image").find("img").attr("src");
        const pageUrl = $(this).find(".card__image").find("a").attr("href");
        const date = $(this).find(".date_day").text();
        info.push({ title, date, img, url: pageUrl });
    })
    return info
}

// FETCHES THE MAIN CELEBRATION DAY FROM https://www.daysoftheyear.com/.
async function fetchMain(date) {
    const url = `https://www.daysoftheyear.com/days/${date}/`; 

    const response = await axios.get(url).catch(() => {
        return Promise.reject("Date not found.")
    })

    const html = response.data;
    const $ = cheerio.load(html);

    // SCRAPE ELEMENTS
    const title = $(".card--hero", html).find(".card__text").find("a").text(); 
    const img = $(".card--hero", html).find(".card__image").find("img").attr("src");
    const pageUrl = $(".card--hero", html).find(".card__image").find("a").attr("href");

    return { title, img, pageUrl };
}