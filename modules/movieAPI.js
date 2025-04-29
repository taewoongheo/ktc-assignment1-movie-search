import { API_KEY } from "../auth.js";

export function getMovieInfo() {
  const url = `https://api.themoviedb.org/3/movie/now_playing?&language=ko-KR&region=KR&api_key=${API_KEY}`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => console.log(json))
    .catch((err) => console.error(err));
}
