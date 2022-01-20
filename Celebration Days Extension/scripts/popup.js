// GET HTML ELEMENTS
const title = document.querySelector(".card-title");
const img = document.querySelector(".card-image");
const btn = document.querySelector("#toggle-btn");
const date = document.querySelector("#date")

// ADD EVENT LISTENER TO TOGGLE BUTTON
btn.addEventListener("click", () => {
  const container = document.querySelector(".expandable");
  container.classList.toggle("opened");
});

function buildCardHTML(title, date, img, url) {
  let wrapper = document.createElement("li");
  wrapper.setAttribute("class", "card-day");

  // PICTURE
  let picture = document.createElement("picture");
  picture.setAttribute("class", "card-picture");
  wrapper.append(picture);

  let link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  picture.append(link);

  let cardImg = document.createElement("img");
  cardImg.setAttribute("class", "card-image");
  cardImg.src = img;
  link.append(cardImg);

  let overlay = document.createElement("div");
  overlay.setAttribute("class", "card-image-overlay");
  link.append(overlay);

  // TEXT CONTENT
  let textContent = document.createElement("div");
  textContent.setAttribute("class", "card-content");
  wrapper.append(textContent);

  let cardTitle = document.createElement("h2");
  cardTitle.setAttribute("class", "card-title");
  cardTitle.innerHTML = title;
  textContent.append(cardTitle);

  return wrapper
}
