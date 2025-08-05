export const DeleteQuiz = (quizRepository) => async ({ quizId }) => {

const res = await quizRepository.deleteQuiz({ quizId });

return res;

}