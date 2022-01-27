import axios from 'axios';
import env from 'src/config/env';

const API = axios.create({
  baseURL: env.baseURL,
});

export default API;
