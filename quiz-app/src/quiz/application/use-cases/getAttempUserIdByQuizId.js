export const GetAttempUserIdByQuizId = (quizRepository) => async ( { userId , quizId, page } ) => {

const res = await quizRepository.getAttempUserIdByQuizId({ userId , quizId , page });

return res;

}