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
  return http.get(`${apiUrl}/movies/${id}`);
}

export function saveMovie(movie) {
  if (!movie._id) return http.post(`${apiUrl}/movies`, movie);

  return http.put(`${apiUrl}/movies/${movie._id}`, movie);
}
