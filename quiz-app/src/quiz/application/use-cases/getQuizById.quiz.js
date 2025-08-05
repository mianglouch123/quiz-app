export const GetQuizById = (quizRepository) => async ({ id , params }) => {

try {

const response = await quizRepository.getQuizById({ id , params });

return response;


}catch(error) {

console.log("Error in get quiz by id USE-CASE " + error.name);
throw error;

}


}