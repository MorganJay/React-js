import http from './httpService';

const apiEndpoint = '/genres';

export function getGenres() {
  return http.get(apiEndpoint);
}

export function getGenre(id) {
  return http.get(`${apiEndpoint}/${id}`);
}
