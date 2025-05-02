import { getAllMovieData } from "./modules/movieAPI.js";
import { renderMovieCards } from "./modules/movieCards.js";

const $movieListSection = document.querySelector("#movie-list-section");
const $searchForm = document.querySelector("#search-form");
const $searchInput = document.querySelector("#search-input");

let movieData = [];

$searchForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const query = $searchInput.value.trim();
  const filtered = movieData.filter((movie) => movie.title.includes(query));
  renderMovieCards($movieListSection, filtered);
});

async function init() {
  movieData = (await getAllMovieData()).results;
  renderMovieCards($movieListSection, movieData);
}

init();
