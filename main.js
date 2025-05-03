import { getAllMovieData } from "./utils/movieAPI.js";
import { renderMovieCards } from "./components/movie-card/movieCard.js";
import { bindModalEvents, showMovieModal } from "./components/modal/modal.js";

const $elems = {
  movieList: document.querySelector("#movie-list-section"),
  searchForm: document.querySelector("#search-form"),
  searchInput: document.querySelector("#search-input"),
  allText: document.querySelector("#all-movie-text"),
  likeText: document.querySelector("#like-movie-text"),
};

let movieMap = new Map();

async function loadMovies() {
  const { results } = await getAllMovieData();
  for (const movie of results) {
    movieMap.set(movie.id, movie);
  }
}

function renderMovies(movies) {
  renderMovieCards($elems.movieList, movies);
}

function filterByTitle(query) {
  const q = query.trim().toLowerCase();
  return Array.from(movieMap.values()).filter((m) =>
    m.title.toLowerCase().includes(q)
  );
}

function getLikedMovies() {
  return Array.from(movieMap.values()).filter((m) =>
    localStorage.getItem(m.id)
  );
}

function toggleLike(target, id) {
  const liked = target.classList.toggle("liked");
  target.textContent = liked ? "❤️" : "♡";
  if (liked) localStorage.setItem(id, id);
  else localStorage.removeItem(id);
}

function onMovieListClick(e) {
  const card = e.target.closest(".movie-card");
  if (!card) return;

  const id = card.dataset.id;
  if (e.target.classList.contains("movie-like")) {
    toggleLike(e.target, id);
    e.stopPropagation();
  } else {
    showMovieModal(id);
  }
}

function bindEvents() {
  $elems.searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    renderMovies(filterByTitle($elems.searchInput.value));
  });

  $elems.allText.addEventListener("click", () =>
    renderMovies(Array.from(movieMap.values()))
  );

  $elems.likeText.addEventListener("click", () =>
    renderMovies(getLikedMovies())
  );

  $elems.movieList.addEventListener("click", onMovieListClick);

  bindModalEvents();
}

(async function initApp() {
  await loadMovies();
  renderMovies(Array.from(movieMap.values()));
  bindEvents();
})();
