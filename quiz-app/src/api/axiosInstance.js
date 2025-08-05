// src/api/axios.js
import axios from 'axios';
import { setToken , interceptorErrorToken } from './interceptors/request/interceptor.request.setToken.js';

import { handleUnauthorizedInterceptor } from './interceptors/response/interceptor.response.handleUnauthorized.js';

import { handleErrorUnauthorizedInterceptor } from './interceptors/response/interceptor.response.handleUnauthorized.js';

const axiosInstance = axios.create({
  baseURL: 'https://backend-quiz-app-6yc1.onrender.com', // Cambia por tu URL base
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // si usas cookies/sesión
});



// ----------------- [ INTERCEPTORS REQUEST ] --------------------

// interceptor token

axiosInstance.interceptors.request.use(setToken,interceptorErrorToken)  



// ----------------- [ INTERCEPTORS RESPONSE ] -------------------


// interceptor response
axiosInstance.interceptors.response.use(handleUnauthorizedInterceptor , handleErrorUnauthorizedInterceptor);

export default axiosInstance;
