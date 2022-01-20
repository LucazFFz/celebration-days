const url = `http://localhost:3000/?type=all&date=${formatUrlDate(new Date())}`;

getJSON(url, (status, res) => {
  if(status !== 200) {
    console.log(res)
  }
  else {
    const heroCardElem = document.querySelector(".card-hero");
    const cardsElem = document.querySelector(".cards");
    let cards = res;
    let hero = cards.splice(0, 1)[0];
    heroCardElem.querySelector(".card-title").innerHTML = hero.title;
    heroCardElem.querySelector(".card-date").innerHTML = hero.date;
    heroCardElem.querySelector(".card-image").src = hero.img;
    heroCardElem.querySelector(".card-url").href = hero.url;

    cards.forEach(card => {
      cardsElem.append(buildCardHTML(card.title, "", card.img, card.url));
    });
  }
});

function getJSON(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "json";
  xhr.onload = function () {
    var status = xhr.status;
    callback(status, xhr.response);
  };
  xhr.send()
}