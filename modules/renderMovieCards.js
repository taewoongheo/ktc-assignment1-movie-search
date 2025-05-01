import { API_KEY } from "../auth.js";
import { getMovieData } from "./movieAPI.js";

export async function renderMovieCards() {
  const $movieListSection = document.querySelector("#movie-list-section");

  try {
    const data = await getMovieData();
    for (const movie of data.results) {
      const { id, poster_path, title, overview, vote_average } = movie;
      $movieListSection.appendChild(
        createMovieCardElement(poster_path, title, overview, vote_average, id)
      );
    }
  } catch (err) {
    console.error(err);
  }
}

function createMovieCardElement(img, title, desc, rating, id) {
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

  const ratingDiv = document.createElement("div");
  const ratingElem = document.createElement("span");
  ratingElem.textContent = `⭐${rating.toFixed(1)}`;
  ratingElem.classList.add("movie-rating");
  ratingDiv.append(ratingElem);

  card.append(posterElem, titleElem, descElem, ratingDiv);

  card.addEventListener("click", async () => {
    const modalContainer = document.querySelector(".modalContainer");
    const modal = document.querySelector(".modal");

    modalContainer.classList.remove("hidden");
    modalContainer.addEventListener("click", (e) => {
      if (e.target !== e.currentTarget) return;

      modalContainer.classList.add("hidden");
      modal.innerHTML = "";
    });

    const url = `https://api.themoviedb.org/3/movie/${id}?&language=ko-KR&region=KR&api_key=${API_KEY}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    };

    try {
      const data = await fetch(url, options);
      const json = await data.json();

      const {
        title,
        genres,
        overview,
        poster_path,
        release_date,
        runtime,
        vote_average,
      } = json;

      const modalTitleElem = document.createElement("h1");
      modalTitleElem.textContent = title;

      const modalGenresElem = document.createElement("p");
      modalGenresElem.textContent = genres.map((el) => el.name).join(", ");

      const modalOverviewElem = document.createElement("p");
      modalOverviewElem.textContent = overview;

      const modalPosterElem = document.createElement("img");
      modalPosterElem.src = `https://image.tmdb.org/t/p/w154${poster_path}`;

      const modalReleaseElem = document.createElement("p");
      modalReleaseElem.textContent = release_date;

      const modalRuntimeElem = document.createElement("p");
      modalRuntimeElem.textContent = runtime;

      const modalRatingElem = document.createElement("p");
      modalRatingElem.textContent = vote_average;

      modal.append(
        modalTitleElem,
        modalGenresElem,
        modalOverviewElem,
        modalPosterElem,
        modalReleaseElem,
        modalRuntimeElem,
        modalRatingElem
      );
    } catch (err) {
      console.error(err);
    }
  });

  return card;
}
