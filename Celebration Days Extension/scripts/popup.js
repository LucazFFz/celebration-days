// GET HTML ELEMENTS
const title = document.querySelector(".card-title");
const img = document.querySelector(".card-image");
const btn = document.querySelector("#toggle-btn");
const date = document.querySelector("#date")

// ADD EVENT LISTENER TO TOGGLE BUTTON
btn.addEventListener("click", () => {
  const container = document.querySelector(".container");
  container.classList.toggle("opened");
});

