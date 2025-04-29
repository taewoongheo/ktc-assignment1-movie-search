import { getMovieData } from "./movieAPI.js";

export async function renderMovieCards() {
  const $movieListSection = document.querySelector(".movie-list-section");

  try {
    const data = await getMovieData();
    for (const movie of data.results) {
      const img = movie.poster_path;
      const title = movie.title;
      const desc = movie.overview;
      const rating = movie.vote_average;
      $movieListSection.appendChild(
        createMovieCardElement(img, title, desc, rating)
      );
    }
  } catch (err) {
    console.error(err);
  }
}

function createMovieCardElement(img, title, desc, rating) {
  const card = document.createElement("article");
  card.classList.add("movie-card");

  const posterElem = document.createElement("img");
  posterElem.src = `https://image.tmdb.org/t/p/w154${img}`;
  posterElem.classList.add("movie-poster");

  const titleElem = document.createElement("h1");
  titleElem.textContent = title;
  titleElem.classList.add("movie-title");

  const descElem = document.createElement("p");
  descElem.textContent = desc;
  descElem.classList.add("movie-overview");

  const ratingElem = document.createElement("p");
  ratingElem.textContent = `${rating.toFixed(1)} / 10`;
  ratingElem.classList.add("movie-rating");

  card.append(posterElem, titleElem, descElem, ratingElem);
  return card;
}
