import { createContainer, createImgElement, createTextElement } from "./dom.js";
import { getMovieDataById } from "./movieAPI.js";

export async function showMovieModal(id) {
  const { $modalContainer, $modal } = getModalDOM();

  openModal($modalContainer);

  $modalContainer.addEventListener("click", (e) =>
    closeModal(e, $modalContainer, $modal)
  );

  const movieData = await getMovieDataById(id);

  const { modalInfoContainer, modalTextContainer } =
    buildModalContent(movieData);

  $modal.append(modalInfoContainer, modalTextContainer);
}

function getModalDOM() {
  const $modalContainer = document.querySelector(".modalContainer");
  const $modal = document.querySelector(".modal");
  return { $modalContainer, $modal };
}

function openModal($modalContainer) {
  $modalContainer.classList.remove("hidden");
}

function closeModal(e, $modalContainer, $modal) {
  if (e.target !== e.currentTarget) return;
  $modalContainer.classList.add("hidden");
  $modal.innerHTML = "";
}

function buildModalContent({
  title,
  genres,
  overview,
  poster_path,
  release_date,
  runtime,
  vote_average,
}) {
  const modalInfoContainer = createContainer("div", "modal-info-container");
  const modalPosterElem = createImgElement(
    `https://image.tmdb.org/t/p/w500${poster_path}`,
    "modal-poster"
  );

  const modalDetailsElem = createContainer("div", "modal-details-container");
  const modalGenresElem = createTextElement(
    "p",
    "modal-genres",
    genres.map((el) => el.name).join(", ")
  );
  const modalReleaseElem = createTextElement(
    "p",
    "modal-release",
    `개봉일: ${release_date}`
  );
  const modalRuntimeElem = createTextElement(
    "p",
    "modal-runtime",
    `상영시간: ${runtime} min`
  );
  const modalRatingElem = createTextElement(
    "p",
    "modal-rating",
    `평점: ⭐${vote_average.toFixed(1)}`
  );

  modalDetailsElem.append(
    modalRatingElem,
    modalGenresElem,
    modalRuntimeElem,
    modalReleaseElem
  );
  modalInfoContainer.append(modalPosterElem, modalDetailsElem);

  const modalTextContainer = createContainer("div", "modal-text-container");
  const modalTitleElem = createTextElement("h1", "modal-title", title);
  const modalOverviewElem = createTextElement("p", "modal-overview", overview);

  modalTextContainer.append(modalTitleElem, modalOverviewElem);

  return { modalInfoContainer, modalTextContainer };
}
