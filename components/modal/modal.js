import {
  createContainer,
  createImgElement,
  createTextElement,
} from "../../utils/dom.js";
import { getMovieDataById } from "../../utils/movieAPI.js";

const $modalContainer = document.querySelector(".modalContainer");
const $modal = document.querySelector(".modal");

$modalContainer.addEventListener("click", closeModal);

export async function showMovieModal(id) {
  $modal.dataset.id = id;
  openModal();
  const movieData = await getMovieDataById(id);
  const { modalInfoContainer, modalTextContainer } =
    buildModalContent(movieData);
  $modal.replaceChildren(modalInfoContainer, modalTextContainer);
}

function openModal() {
  $modalContainer.classList.remove("hidden");
  history.pushState({ modal: true }, "", $modal.dataset.id);
}

function closeModal(e) {
  if (e.target !== $modalContainer) return;
  $modalContainer.classList.add("hidden");
  $modal.innerHTML = "";
  if (history.state.modal) history.back();
}

window.addEventListener("popstate", (e) => {
  if (e.state === null) {
    $modalContainer.classList.add("hidden");
  }
});

function buildModalContent({
  id,
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

  const isLiked = localStorage.getItem(id) ? true : false;
  const modalLikeElem = createTextElement(
    "p",
    "modal-like",
    `좋아요: ${isLiked ? "❤️" : "♡"}`
  );
  if (isLiked) modalLikeElem.classList.add("liked");

  modalLikeElem.addEventListener("click", (e) => {
    const elem = e.target;
    elem.classList.toggle("liked");
    if (elem.classList.contains("liked")) {
      elem.innerHTML = "좋아요: ❤️";
      localStorage.setItem(id, id);
    } else if (!elem.classList.contains("liked")) {
      elem.innerHTML = "좋아요: ♡";
      localStorage.removeItem(id);
    }
  });

  modalDetailsElem.append(
    modalRatingElem,
    modalGenresElem,
    modalRuntimeElem,
    modalReleaseElem,
    modalLikeElem
  );
  modalInfoContainer.append(modalPosterElem, modalDetailsElem);

  const modalTextContainer = createContainer("div", "modal-text-container");
  const modalTitleElem = createTextElement("h1", "modal-title", title);
  const modalOverviewElem = createTextElement("p", "modal-overview", overview);

  modalTextContainer.append(modalTitleElem, modalOverviewElem);

  return { modalInfoContainer, modalTextContainer };
}
