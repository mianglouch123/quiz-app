import React from "react";
import { useMemo, useCallback } from "react";
import { QuizApiRepository } from "../../../quiz/infraestrucutre/api/quiz.api.repository.js";
import { GetTotalUsersByQuizId } from "../../../quiz/application/use-cases/getTotalUsersByQuizId.js";
function UseGetTotalUsersByQuizId() {

const quizRepository = useMemo(() => new QuizApiRepository() , []);
const getTotalUsersByQuizIdUseCase = useMemo(() =>  GetTotalUsersByQuizId(quizRepository), [quizRepository])

const getTotalUsersByQuizId = useCallback(async ({ id , page }) => {

const data = await getTotalUsersByQuizIdUseCase({ id , page });

return data;

} , [getTotalUsersByQuizIdUseCase])

return { getTotalUsersByQuizId }

}

export default UseGetTotalUsersByQuizId