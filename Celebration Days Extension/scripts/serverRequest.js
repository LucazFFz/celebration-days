const url = `https://celebration-api.herokuapp.com/?fetch=all&date=${formatUrlDate(new Date())}`;

getJSON(url, (status, res) => {
  if(status !== 200) {
    console.log(res)
  }
  else {
    const mainCardElem = document.querySelector(".card-hero");
    const cardsElem = document.querySelector(".cards");
    let cards = res;
    let main = cards.splice(0, 1)[0];

    // RENDER MAIN CARD
    mainCardElem.querySelector(".card-image").src = main.img;
    mainCardElem.querySelector(".card-title").innerHTML = main.title;
    mainCardElem.querySelector(".card-date").innerHTML = main.date;
    mainCardElem.querySelector(".card-url").href = main.url;

    // RENDER ALL OTHER CARDS
    cards.forEach(card => {
      cardsElem.append(buildCardHTML(card.title, card.img, card.url));
    });
  }
});

// MAKE HTTP REQUEST AND RETURN IN JSON FORMAT
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