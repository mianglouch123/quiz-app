import React from "react";
import { useCallback, useMemo } from "react";
import { CreateQuiz } from "../../../quiz/application/use-cases/createQuiz.quiz.js";
import { QuizApiRepository } from "../../../quiz/infraestrucutre/api/quiz.api.repository.js";
function UseCreateQuiz() {

const quizRepository = useMemo(() => new QuizApiRepository() , []);

const createQuizUseCase = useMemo(() => CreateQuiz(quizRepository) , [quizRepository]);

const createQuiz = useCallback(async ({ data }) => {
 
try {

const response = await createQuizUseCase({ data });

return response;

}catch(error) {

console.error("Error in USE-HOOK , at the moment to create a quiz " + error.name);
throw error;


}

} , [createQuizUseCase])

return { createQuiz }


}

export default UseCreateQuiz;