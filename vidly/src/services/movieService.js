import http from './httpService';
import { apiUrl } from '../config.json';
import { getGenre } from './genreService';

export function getMovies() {
  return http.get(`${apiUrl}/movies`);
}

export function deleteMovie(id) {
  http.delete(`${apiUrl}/movies/${id}`);
}

export function getMovie(id) {
  return http.get(`${apiUrl}/movies/${id}`)
}

export function saveMovie(movie) {
  let movieInDb = getMovie(movie.id) || {};

//   movieInDb.title = movie.title;
//   movieInDb.genre = getGenre(movie.genreId);
//   movieInDb.numberInStock = movie.numberInStock;
//   movieInDb.dailyRentalRate = movie.dailyRentalRate;

  if (!movieInDb._id) {
    movieInDb._id = Date.now().toString();
   return http.post(`${apiUrl}/movies`, movieInDb);
  }
  return http.put(`${apiUrl}/movies/${id}`, movieInDb);
}
