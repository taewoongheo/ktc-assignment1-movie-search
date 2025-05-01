import { renderMovieCards } from "./modules/movieCards.js";

const $movieListSection = document.querySelector("#movie-list-section");
await renderMovieCards($movieListSection);
