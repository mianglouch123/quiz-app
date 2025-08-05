export const GetQuizzes = (quizRepository) => async ({ params }) => {

try {

const res = await quizRepository.getQuizzes({ params });

return res

}catch(e) {
console.error("Error in APPLICATION getQuiz - USE CASE");
throw e;
}



}