import {
  createContainer,
  createImgElement,
  createTextElement,
} from "../../utils/dom.js";
import { showMovieModal } from "../modal/modal.js";

export function renderMovieCards($container, movies) {
  $container.innerHTML = "";
  for (const movie of movies) {
    const { id, poster_path, title, overview, vote_average } = movie;
    $container.append(
      createMovieCardElement(poster_path, title, overview, vote_average, id)
    );
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
  const ratingDiv = createContainer("div", "movie-RL-container");
  const ratingElem = createTextElement(
    "span",
    "movie-rating",
    `⭐${rating.toFixed(1)}`
  );
  const likeElem = createTextElement(
    "p",
    "movie-like",
    localStorage.getItem(id) ? "❤️" : "♡"
  );
  ratingDiv.append(ratingElem);
  ratingDiv.append(likeElem);

  card.append(posterElem, titleElem, descElem, ratingDiv);

  card.addEventListener("click", () => showMovieModal(id));
  likeElem.addEventListener("click", (e) => {
    const likeStatus = e.target.innerHTML;
    if (likeStatus === "♡") {
      e.target.innerHTML = "❤️";
      localStorage.setItem(id, id);
    } else {
      e.target.innerHTML = "♡";
      localStorage.removeItem(id);
    }
    e.stopPropagation();
  });

  return card;
}
