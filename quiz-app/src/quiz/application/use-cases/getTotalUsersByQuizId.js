export const GetTotalUsersByQuizId = (quizRepository) => async ({ id , page }) => {

try {

const response = await quizRepository.getTotalUsersByQuizId({ id , page });

return response;

}catch(error) {
console.log("Error in get quiz by id USE-CASE " + error.name);
throw error;
}

}