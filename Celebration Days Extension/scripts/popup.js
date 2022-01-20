// GET HTML ELEMENTS
const title = document.querySelector(".card-title");
const img = document.querySelector(".card-image");
const btn = document.querySelector("#toggle-btn");
const date = document.querySelector("#date")

// BUILD CARDS
function buildCardHTML(title, img, url) {
  // --- LI WRAPPER ELEMENT ---
  let wrapper = document.createElement("li");
  wrapper.setAttribute("class", "card-day");

  // - PICTURE --
  let picture = document.createElement("picture");
  picture.setAttribute("class", "card-picture");
  wrapper.append(picture);

  // URL LINK 
  let link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  picture.append(link);

  // IMAGE
  let cardImg = document.createElement("img");
  cardImg.setAttribute("class", "card-image");
  cardImg.src = img;
  link.append(cardImg);

  // IMAGE OVERLAY
  let overlay = document.createElement("div");
  overlay.setAttribute("class", "card-image-overlay");
  link.append(overlay);

  // -- TEXT CONTENT --
  let textContent = document.createElement("div");
  textContent.setAttribute("class", "card-content");
  wrapper.append(textContent);

  let cardTitle = document.createElement("h2");
  cardTitle.setAttribute("class", "card-title");
  cardTitle.innerHTML = title;
  textContent.append(cardTitle);

  return wrapper
}

// ADD EVENT LISTENER TO TOGGLE BUTTON
// COLLAPSE / EXPAND COLLAPSIBLE ELEMENT
btn.addEventListener("click", () => {
  const container = document.querySelector(".collapsible");
  document.querySelector("#toggle-btn").classList.toggle("collapsed");
  expandElement(container, "collapsed");
});

// COLLAPSE / EXPAND ELEMENT
function expandElement(elem, collapseClass) {
  elem.style.height = "";
  elem.style.transition = "none";

  const startHeight = window.getComputedStyle(elem).height;
  console.log("start height:", startHeight);

  elem.classList.toggle(collapseClass);
  const height = window.getComputedStyle(elem).height;

  elem.style.height = startHeight;

  requestAnimationFrame(() => {
    elem.style.transition = "";

    requestAnimationFrame(() => {
      elem.style.height = height;
    });
  });
}

