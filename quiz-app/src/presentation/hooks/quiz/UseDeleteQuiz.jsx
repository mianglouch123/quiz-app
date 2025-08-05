import React from "react";
import { useCallback, useMemo } from "react";
import { DeleteQuiz } from "../../../quiz/application/use-cases/deleteQuiz.quiz.js";
import { QuizApiRepository } from "../../../quiz/infraestrucutre/api/quiz.api.repository.js";
function UseDeleteQuiz() {

const quizRepository = useMemo(() => new QuizApiRepository() , []);

const deleteQuizUseCase = useMemo(() => DeleteQuiz(quizRepository) , [quizRepository]);

const deleteQuiz = useCallback(async ({ quizId }) => {
 
try {

const response = await deleteQuizUseCase({ quizId });

return response;

}catch(error) {

console.error("Error in USE-HOOK , at the moment to delete a quiz " + error.name);
throw error;


}

} , [deleteQuizUseCase])

return { deleteQuiz }


}

export default UseDeleteQuiz;