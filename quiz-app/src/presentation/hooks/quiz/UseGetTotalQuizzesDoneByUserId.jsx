import React from "react";
import { useMemo , useCallback } from "react";
import { QuizApiRepository } from "../../../quiz/infraestrucutre/api/quiz.api.repository";
import { GeTotalQuizzesDone } from "../../../quiz/application/use-cases/getTotaQuizzesDoneByUserId.js";

function UseGetTotalQuizzesDoneByUserId() {

const quizRepository = useMemo(() => new QuizApiRepository() , []);
const getTotalQuizzesDoneUseCase = useMemo(() =>  GeTotalQuizzesDone(quizRepository), [quizRepository]);

const getTotalQuizzesDone = useCallback( async ({ userId , categoryName }) => {

const data = await getTotalQuizzesDoneUseCase({ userId ,  categoryName });

return data;

} , [getTotalQuizzesDoneUseCase ])

return { getTotalQuizzesDone };
 
}

export default UseGetTotalQuizzesDoneByUserId;