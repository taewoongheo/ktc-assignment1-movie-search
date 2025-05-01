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

      const modalInfoContainer = document.createElement("div");
      modalInfoContainer.classList.add("modal-info-container");

      const modalPosterElem = document.createElement("img");
      modalPosterElem.src = `https://image.tmdb.org/t/p/w154${poster_path}`;
      modalPosterElem.classList.add("modal-poster");

      const modalDetailsElem = document.createElement("div");
      modalDetailsElem.classList.add("modal-details-container");

      const modalGenresElem = document.createElement("p");
      modalGenresElem.textContent = genres.map((el) => el.name).join(", ");
      modalGenresElem.classList.add("modal-genres");

      const modalReleaseElem = document.createElement("p");
      modalReleaseElem.textContent = `개봉일: ${release_date}`;
      modalReleaseElem.classList.add("modal-release");

      const modalRuntimeElem = document.createElement("p");
      modalRuntimeElem.textContent = `상영시간: ${runtime} min`;
      modalRuntimeElem.classList.add("modal-runtime");

      const modalRatingElem = document.createElement("p");
      modalRatingElem.textContent = `평점: ⭐${vote_average.toFixed(1)}`;
      modalRatingElem.classList.add("modal-rating");

      modalDetailsElem.append(
        modalRatingElem,
        modalGenresElem,
        modalRuntimeElem,
        modalReleaseElem
      );
      modalInfoContainer.append(modalPosterElem, modalDetailsElem);

      const modalTextContainer = document.createElement("div");
      modalTextContainer.classList.add("modal-text-container");

      const modalTitleElem = document.createElement("h1");
      modalTitleElem.textContent = title;
      modalTitleElem.classList.add("modal-title");

      const modalOverviewElem = document.createElement("p");
      modalOverviewElem.textContent = overview;
      modalOverviewElem.classList.add("modal-overview");

      modalTextContainer.append(modalTitleElem, modalOverviewElem);

      modal.append(modalInfoContainer, modalTextContainer);
    } catch (err) {
      console.error(err);
    }
  });

  return card;
}
