import React from "react";
import { useMemo , useCallback } from "react";
import { TakeQuiz } from "../../../quiz/application/use-cases/takeQuiz.quiz.js";
import { QuizApiRepository } from "../../../quiz/infraestrucutre/api/quiz.api.repository.js";

function UseTakeQuiz() {

const quizRepository = useMemo(() => new QuizApiRepository() , []);

const takeQuizUseCase = useMemo(() => TakeQuiz(quizRepository) ,[quizRepository]);

const takeQuiz = useCallback(async ({ userId, quizId, data  }) => {

const response = await takeQuizUseCase({ userId, quizId, data });

return response;

} , [takeQuizUseCase])


return { takeQuiz }


}

export default UseTakeQuiz;