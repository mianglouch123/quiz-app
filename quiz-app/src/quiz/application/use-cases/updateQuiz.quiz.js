export const UpdateQuiz = (quizRepository) => async ({ userId, title, quizId, data }) => {

const res = await quizRepository.updateQuiz({ userId, title, quizId, data });

return res;

}