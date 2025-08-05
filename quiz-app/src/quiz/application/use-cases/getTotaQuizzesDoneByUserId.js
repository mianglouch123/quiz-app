export const  GeTotalQuizzesDone = (quizRepository) => async ({ userId , categoryName } ) => {

const res = await  quizRepository.geTotalQuizzesDone({ userId , categoryName });

return res;

} 