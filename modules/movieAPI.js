import { API_KEY } from "../auth.js";

export async function getMovieInfo() {
  const url = `https://api.themoviedb.org/3/movie/now_playing?&language=ko-KR&region=KR&api_key=${API_KEY}`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  };

  try {
    return (await fetch(url, options)).json();
  } catch (err) {
    console.error(err);
  }
}
