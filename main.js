import { getMovieData } from "./modules/movieAPI.js";

const $movieListSection = document.querySelector(".movie-list-section");

async function renderMovieData() {
  try {
    const data = await getMovieData();
    for (const movie of data.results) {
      console.log(movie);

      const card = document.createElement("article");
      card.classList.add("movie-card");

      const img = document.createElement("img");
      img.src = `https://image.tmdb.org/t/p/w154${movie.poster_path}`;
      img.classList.add("movie-poster");

      const h1 = document.createElement("h1");
      h1.textContent = movie.title;
      h1.classList.add("movie-title");

      const desc = document.createElement("p");
      desc.textContent = movie.overview;
      desc.classList.add("movie-overview");

      const rating = document.createElement("p");
      rating.textContent = `${movie.vote_average.toFixed(1)} / 10`;
      rating.classList.add("movie-rating");

      card.append(img, h1, desc, rating);
      $movieListSection.appendChild(card);
    }
  } catch (err) {
    console.error(err);
  }
}

await renderMovieData();
