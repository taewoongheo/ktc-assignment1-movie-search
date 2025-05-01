import { createContainer, createImgElement, createTextElement } from "./dom.js";
import { getAllMovieData } from "./movieAPI.js";
import { showMovieModal } from "./modal.js";

export async function renderMovieCards($container) {
  try {
    const data = await getAllMovieData();
    for (const movie of data.results) {
      const { id, poster_path, title, overview, vote_average } = movie;
      $container.appendChild(
        createMovieCardElement(poster_path, title, overview, vote_average, id)
      );
    }
  } catch (err) {
    console.error(err);
  }
}

function createMovieCardElement(img, title, desc, rating, id) {
  const card = createContainer("article", "movie-card");

  const posterElem = createImgElement(
    `https://image.tmdb.org/t/p/w500${img}`,
    "movie-poster"
  );
  const titleElem = createTextElement("h1", "movie-title", title);
  const descElem = createTextElement("p", "movie-overview", desc);
  const ratingDiv = createContainer();
  const ratingElem = createTextElement(
    "span",
    "movie-rating",
    `⭐${rating.toFixed(1)}`
  );
  ratingDiv.append(ratingElem);

  card.append(posterElem, titleElem, descElem, ratingDiv);

  card.addEventListener("click", () => showMovieModal(id));

  return card;
}
