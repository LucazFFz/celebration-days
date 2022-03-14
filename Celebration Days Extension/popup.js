let title = document.querySelector("#celebration-day-title");
let img = document.querySelector(".hero-img");
let btn = document.querySelector("#toggle-btn");
const months = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "june",
  "july",
  "aug",
  "sept",
  "oct",
  "nov",
  "dec",
];
const url = `http://localhost:3000/?date=${formatDate(new Date())}`;

getJSON(url, (status, res) => {
  if(status !== 200) title.innerHTML = status;
  else {
    title.innerHTML = res.title;
    img.setAttribute("src", res.img);
  }
});

function formatDate(date) {
  const month = months[date.getMonth()];
  const day = date.getDate() > 10 ? date.getDate() : `0${date.getDate()}`;
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
}

function getJSON(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "json";
  xhr.onload = function () {
    var status = xhr.status;
    callback(status, xhr.response);
  };
  xhr.send();
};

btn.addEventListener("click", () => {
  const container = document.querySelector(".container");
  container.classList.toggle("opened");
})
