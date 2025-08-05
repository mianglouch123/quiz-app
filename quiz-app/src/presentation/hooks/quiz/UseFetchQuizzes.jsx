import React from "react";
import { useMemo , useCallback } from "react";
import { QuizApiRepository } from "../../../quiz/infraestrucutre/api/quiz.api.repository";
import { GetQuizzes } from "../../../quiz/application/use-cases/getQuiz.quiz.js";
function UseFetchQuizzes() {

const quizRepository = useMemo(() => new QuizApiRepository() , []);
const createQuizUseCase = useMemo(() =>  GetQuizzes(quizRepository), [quizRepository]);

const getQuizzes = useCallback( async ({ params }) => {

const data = await createQuizUseCase({ params });

return data;

} , [createQuizUseCase])

return { getQuizzes };
 
}

export default UseFetchQuizzes;