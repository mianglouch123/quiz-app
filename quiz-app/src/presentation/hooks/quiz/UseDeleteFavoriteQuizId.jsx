import React from "react";
import { useCallback, useMemo } from "react";
import { DeleteFavoriteQuizById } from "../../../quiz/application/use-cases/deleteFavoriteQuiz.js";
import { QuizApiRepository } from "../../../quiz/infraestrucutre/api/quiz.api.repository.js";
function UseDeleteFavoriteQuizId() {

const quizRepository = useMemo(() => new QuizApiRepository() , []);

const deleteFavoriteQuizUseCase = useMemo(() => DeleteFavoriteQuizById(quizRepository) , [quizRepository]);

const deleteFavoriteQuizById = useCallback(async ({ userId , quizId }) => {
 
try {

const response = await deleteFavoriteQuizUseCase({ userId, quizId });

return response;

}catch(error) {

console.error("Error in USE-HOOK , at the moment to delete the favorite quiz id " + error.name);
throw error;


}

} , [deleteFavoriteQuizUseCase])

return { deleteFavoriteQuizById }


}

export default UseDeleteFavoriteQuizId;