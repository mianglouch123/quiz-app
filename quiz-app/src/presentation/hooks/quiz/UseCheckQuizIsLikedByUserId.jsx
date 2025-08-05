import React from "react";
import { useCallback, useMemo } from "react";
import { CheckQuizLikedByUserId } from "../../../quiz/application/use-cases/checkQuizIsLikedByUserId.js";
import { QuizApiRepository } from "../../../quiz/infraestrucutre/api/quiz.api.repository.js";
function UseCheckQuizIsLikedByUserId() {

const quizRepository = useMemo(() => new QuizApiRepository() , []);

const checkQuizIsLikedByUserIdUseCase = useMemo(() => CheckQuizLikedByUserId(quizRepository) , [quizRepository]);

const checkQuizIsLikedByUserId = useCallback(async ({ userId, quizId }) => {
 
try {

const response = await checkQuizIsLikedByUserIdUseCase({ userId, quizId });

return response;

}catch(error) {

console.error("Error in USE-HOOK , at the moment to add favorite quiz " + error.name);
throw error;


}

} , [checkQuizIsLikedByUserIdUseCase]); 

return { checkQuizIsLikedByUserId }


}

export default UseCheckQuizIsLikedByUserId;