import axios from 'axios';
import { toast } from 'react-toastify';
import logger from './logService';

axios.interceptors.response.use(null, error => {
  const expectedError =
  error.response &&
  error.response.status >= 400 &&
  error.response.status < 500;
  
  if (!expectedError) {
    logger.log(error);
    toast.error('An unexpected error occurred.');
  }
  
  return Promise.reject(error);
});

export function expectedError(error, statusCode) {
  return error.response && error.response.status === statusCode;
}

export function setJwt(jwt){
  axios.defaults.headers.common['x-auth-token'] = jwt
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  setJwt,
  expectedError
};
