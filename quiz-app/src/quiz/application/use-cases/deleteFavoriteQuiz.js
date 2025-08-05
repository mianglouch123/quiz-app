export const DeleteFavoriteQuizById = (quizRepository) => async( { userId, quizId } ) => {

const res = await quizRepository.deleteFavoriteQuizById({ userId , quizId });

return res;

}