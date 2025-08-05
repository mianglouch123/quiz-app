export const AddFavoriteQuiz = (quizRepository) => async ({ userId, quizId }) => {

const res = await quizRepository.addFavoriteQuiz({ userId, quizId });

return res;

}