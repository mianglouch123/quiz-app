export const CheckQuizLikedByUserId = (apiRepository) => async ( { userId , quizId }) => {

const res = await apiRepository.checkQuizLikedByUserId({ userId , quizId });

return res;

} 