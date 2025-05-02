import { getAllMovieData } from "./utils/movieAPI.js";
import { renderMovieCards } from "./components/movie-card/movieCard.js";

const $movieListSection = document.querySelector("#movie-list-section");
const $searchForm = document.querySelector("#search-form");
const $searchInput = document.querySelector("#search-input");

const $allMovieText = document.querySelector("#all-movie-text");
const $likeMovieText = document.querySelector("#like-movie-text");

let movieData = [];

$searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const query = $searchInput.value.trim();
  const filtered = movieData.filter((movie) => movie.title.includes(query));
  renderMovieCards($movieListSection, filtered);
});

$allMovieText.addEventListener("click", async () => {
  await init();
});

$likeMovieText.addEventListener("click", () => {
  const filtered = movieData.filter((movie) => localStorage.getItem(movie.id));
  renderMovieCards($movieListSection, filtered);
});

async function init() {
  movieData = (await getAllMovieData()).results;
  renderMovieCards($movieListSection, movieData);
}

init();
