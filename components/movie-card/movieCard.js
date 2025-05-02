import {
  createContainer,
  createImgElement,
  createTextElement,
} from "../../utils/dom.js";

export function renderMovieCards($container, movies) {
  $container.innerHTML = "";
  for (const movie of movies.values()) {
    const { id, poster_path, title, overview, vote_average } = movie;
    $container.append(
      createMovieCardElement(poster_path, title, overview, vote_average, id)
    );
  }
}

function createMovieCardElement(img, title, desc, rating, id) {
  const card = createContainer("article", "movie-card");
  card.dataset.id = id;

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

  const isLiked = localStorage.getItem(id) ? true : false;
  const likeElem = createTextElement("p", "movie-like", isLiked ? "❤️" : "♡");
  if (isLiked) likeElem.classList.add("liked");

  ratingDiv.append(ratingElem);
  ratingDiv.append(likeElem);

  card.append(posterElem, titleElem, descElem, ratingDiv);

  return card;
}
