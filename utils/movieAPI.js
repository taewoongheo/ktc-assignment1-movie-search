import { API_KEY } from "../auth.js";

export async function getAllMovieData() {
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

export async function getMovieDataById(id) {
  try {
    const url = `https://api.themoviedb.org/3/movie/${id}?&language=ko-KR&region=KR&api_key=${API_KEY}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    };

    const data = await fetch(url, options);
    const {
      title,
      genres,
      overview,
      poster_path,
      release_date,
      runtime,
      vote_average,
    } = await data.json();

    return {
      title,
      genres,
      overview,
      poster_path,
      release_date,
      runtime,
      vote_average,
    };
  } catch (err) {
    console.error(err);
  }
}
