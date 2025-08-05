import React from "react";
import { useCallback, useMemo } from "react";
import { AddFavoriteQuiz } from "../../../quiz/application/use-cases/addFavoriteQuiz.js";
import { QuizApiRepository } from "../../../quiz/infraestrucutre/api/quiz.api.repository.js";
function UseFavoriteQuiz() {

const quizRepository = useMemo(() => new QuizApiRepository() , []);

const addFavoriteQuizUseCase = useMemo(() => AddFavoriteQuiz(quizRepository) , [quizRepository]);

const addFavoriteQuiz = useCallback(async ({ userId, quizId }) => {
 
try {

const response = await addFavoriteQuizUseCase({ userId, quizId });

return response;

}catch(error) {

console.error("Error in USE-HOOK , at the moment to add favorite quiz " + error.name);
throw error;


}

} , [addFavoriteQuizUseCase])

return { addFavoriteQuiz }


}

export default UseFavoriteQuiz;