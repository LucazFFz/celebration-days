const PORT = 3000;

const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended : false}));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    console.log("Received a http get request...")
  
    if(req.query.type === "hero") hero();
    else if(req.query.type === "all") all();
    else {
        res.status(400);
        res.send({msg: "Type not found.", status: 400});
    }
   
    async function hero() {
        const resolve = await getHero(req.query.date).catch((error) => {
            res.status(400);
            res.send({ msg: error, status: 400 });
        })
        res.send(JSON.stringify(resolve));
    };

    async function all() {
        const resolve = await getAll(req.query.date).catch((error) => {
            res.status(400);
            res.send({ msg: error, status: 400 });
        })
        res.send(JSON.stringify(resolve));
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`))

async function getAll(date) {
    const url = `https://www.daysoftheyear.com/days/${date}/`; 
    const response = await axios.get(url).catch(() => {
        return Promise.reject("Date not found");
    })

    let info = []
    const html = response.data;
    const $ = cheerio.load(html);

    $(".section--group").first().find(".card--day").each(function() { 
        const title = $(this).find(".card__title").find("a").text();
        const img = $(this).find(".card__image").find("img").attr("src");
        const pageUrl = $(this).find(".card__image").find("a").attr("href");
        const date = $(this).find(".date_day").text();
        info.push({ title, date, img, url: pageUrl });
    })

    

    return info
}





















async function getHero(date) {
    const url = `https://www.daysoftheyear.com/days/${date}/`; 
    const response = await axios.get(url).catch(() => {
        return Promise.reject("Celebration day not found.")
    })

    const html = response.data;
    const $ = cheerio.load(html);

    const title = $(".card--hero", html).find(".card__text").find("a").text(); 
    const img = $(".card--hero", html).find(".card__image").find("img").attr("src");
    const pageUrl = $(".card--hero", html).find(".card__image").find("a").attr("href");

    console.log({ heroTitle: title, heroImg: img, heroUrl: url })
    return { title, img, pageUrl };
}






/*
async function getInfo(url) {
    console.log(formatDay(celebrationDay));
    const dayUrl = `https://www.daysoftheyear.com/days/tempura-day/`;
    const response = await axios.get(dayUrl);
    const html = response.data;
    const $ = cheerio.load(html);
    $("main").find("p").each(function() {
        const text = $(this).text();
        info.push(text)
    })        
    return { text };
} 


function formatDay(celebrationDay) {
    console.log(celebrationDay);
    return celebrationDay.trim().replace(/ /gi, "-").toLowerCase()
}
*/




