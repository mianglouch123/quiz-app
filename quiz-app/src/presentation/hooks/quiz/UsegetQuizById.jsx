import React from "react";
import { useMemo , useCallback } from "react";
import { GetQuizById } from "../../../quiz/application/use-cases/getQuizById.quiz.js";
import { QuizApiRepository } from "../../../quiz/infraestrucutre/api/quiz.api.repository.js";

function UseGetQuizById() {

const quizRepository = useMemo(() => new QuizApiRepository() , []);

const getQuizByIdUseCase = useMemo(() => GetQuizById(quizRepository) ,[quizRepository]);

const getQuizById = useCallback(async ({ id , params }) => {

const data = await getQuizByIdUseCase({ id , params });

return data;

} , [getQuizByIdUseCase])


return { getQuizById }


}

export default UseGetQuizById;