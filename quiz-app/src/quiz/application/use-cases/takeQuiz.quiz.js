export const TakeQuiz = (quizRepository) => async ({ userId, quizId, data }) => {

const response = await quizRepository.takeQuiz({ userId , quizId , data });

return response;

}

