const PORT = 3000;

const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extende : false}));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    getCelebrationDayTitle(req.query.date)
    .then((resolve, reject) => {
        res.send(JSON.stringify(resolve));
    }).catch((error) => {
        console.log(error);
        res.status(400);
        res.send(error);
    })
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`))

async function getCelebrationDayTitle(date) {
    const url = `https://www.daysoftheyear.com/days/${date}/`; 
    const response = await axios.get(url).catch(() => {
        return Promise.reject("Celebration day not found.")
    })

    const html = response.data;
    const $ = cheerio.load(html);
    const title = $(".card--hero", html).find("a").text(); 
    const img = $(".card--hero", html).find(".card__image").find("img").attr("src");
    return { title, img };

    
}

async function getCelebrationDayInfo() {
    let info = []
    const dayUrl = `https://www.daysoftheyear.com/days/tempura-day/`;
    const response = await axios.get(dayUrl);
    const html = response.data;
    const $ = cheerio.load(html);
    $("main").find("p").each(function() {
        const text = $(this).text();
        info.push(text)
    })        
    return { title, img, info };
} 





