const url = `http://localhost:3000/?type=all&date=${formatUrlDate(new Date())}`;

getJSON(url, (status, res) => {
  if(status !== 200) title.innerHTML = status;
  else {
    title.innerHTML = res[0].title;
    img.getChildren("img").setAttribute("src", res[0].img);
    date.innerHTML = res[0].date;
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
  xhr.send();
};