import React from "react";
import { useMemo , useCallback } from "react";
import { QuizApiRepository } from "../../../quiz/infraestrucutre/api/quiz.api.repository";
import { GetAttempUserIdByQuizId } from "../../../quiz/application/use-cases/getAttempUserIdByQuizId.js";
function UseGetAttempUserIdByQuizId() {

const quizRepository = useMemo(() => new QuizApiRepository() , []);
const getAttempUserIdByQuizIdUseCase= useMemo(() =>  GetAttempUserIdByQuizId(quizRepository), [quizRepository]);

const getAttempUserIdByQuizId = useCallback( async ({ userId , quizId , page }) => {

const data = await getAttempUserIdByQuizIdUseCase({ userId , quizId , page });

return data;

} , [getAttempUserIdByQuizIdUseCase])

return { getAttempUserIdByQuizId };
 
}

export default UseGetAttempUserIdByQuizId;