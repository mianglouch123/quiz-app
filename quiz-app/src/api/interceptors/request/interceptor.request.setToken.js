

export const setToken = ( request ) => {

const token = localStorage.getItem("token");

if(token) {

request.headers.Authorization = token;

}

return request;

}

export const interceptorErrorToken = ( error ) => {

return Promise.reject(error);

}

