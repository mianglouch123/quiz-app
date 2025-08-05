import React from "react";
import { useMemo , useCallback } from "react";
import { UpdateQuiz } from "../../../quiz/application/use-cases/updateQuiz.quiz.js";
import { QuizApiRepository } from "../../../quiz/infraestrucutre/api/quiz.api.repository.js";

function UseUpdateQuiz() {

const quizRepository = useMemo(() => new QuizApiRepository() , []);

const updateQuizUseCase = useMemo(() => UpdateQuiz(quizRepository) ,[quizRepository]);

const updateQuiz = useCallback(async ({ userId, title, quizId, data  }) => {

const response = await updateQuizUseCase({ userId, title, quizId, data });

return response;

} , [updateQuizUseCase])


return { updateQuiz }


}

export default UseUpdateQuiz;