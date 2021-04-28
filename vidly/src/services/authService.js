import jwtDecode from 'jwt-decode';
import http from './httpService';

const apiEndpoint = '/auth';
const tokenKey = 'token';

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

http.setJwt(getJwt());
const currentUser = getCurrentUser();

export default {
  login,
  loginWithJwt,
  logout,
  currentUser,
  getCurrentUser,
  getJwt
};
