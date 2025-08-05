export const handleUnauthorizedInterceptor = (response) => response;


export const handleErrorUnauthorizedInterceptor = ( error ) => {

if(error.reponse?.status === 403 ) {
localStorage.removeItem("user");

window.location.href = "/login";


}

return Promise.reject(error);

}



