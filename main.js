import { getAllMovieData } from "./utils/movieAPI.js";
import { renderMovieCards } from "./components/movie-card/movieCard.js";
import { showMovieModal } from "./components/modal/modal.js";

const $movieListSection = document.querySelector("#movie-list-section");
const $searchForm = document.querySelector("#search-form");
const $searchInput = document.querySelector("#search-input");

const $allMovieText = document.querySelector("#all-movie-text");
const $likeMovieText = document.querySelector("#like-movie-text");

let movieData = new Map();

$searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const query = $searchInput.value.trim();
  const filtered = [];
  for (const movie of movieData.values()) {
    if (movie.title.includes(query)) filtered.push(movie);
  }
  renderMovieCards($movieListSection, filtered);
});

$allMovieText.addEventListener("click", async () => {
  await init();
});

$likeMovieText.addEventListener("click", () => {
  const filtered = [];
  for (const movie of movieData.values()) {
    if (localStorage.getItem(movie.id)) filtered.push(movie);
  }
  renderMovieCards($movieListSection, filtered);
});

$movieListSection.addEventListener("click", (e) => {
  if (e.target.classList.contains("movie-like")) return;

  const card = e.target.closest(".movie-card");
  if (!card) return;

  showMovieModal(card.dataset.id);
});

$movieListSection.addEventListener("click", (e) => {
  if (!e.target.classList.contains("movie-like")) return;

  const id = e.target.closest(".movie-card").dataset.id;

  e.target.classList.toggle("liked");
  if (e.target.classList.contains("liked")) {
    e.target.innerHTML = "❤️";
    localStorage.setItem(id, id);
  } else {
    e.target.innerHTML = "♡";
    localStorage.removeItem(id);
  }
  e.stopPropagation();
});

async function init() {
  for (const movie of (await getAllMovieData()).results) {
    movieData.set(movie.id, movie);
  }
  renderMovieCards($movieListSection, movieData);
}

init();
