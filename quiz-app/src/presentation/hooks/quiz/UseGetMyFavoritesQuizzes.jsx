import React from "react";
import { useMemo , useCallback } from "react";
import { GetMyFavoritesQuizzes } from "../../../quiz/application/use-cases/getMyFavorites.js";
import { QuizApiRepository } from "../../../quiz/infraestrucutre/api/quiz.api.repository.js";

function UseGetMyFavoriteQuizzes() {

const quizRepository = useMemo(() => new QuizApiRepository() , []);

const getMyFavoriteQuizzesUseCase = useMemo(() => GetMyFavoritesQuizzes(quizRepository) ,[quizRepository]);

const getMyFavoriteQuizzes = useCallback(async ({ userId , sortBy , order , page }) => {

const data = await getMyFavoriteQuizzesUseCase({ userId , sortBy , order , page });

return data;

} , [getMyFavoriteQuizzesUseCase])


return { getMyFavoriteQuizzes }


}

export default UseGetMyFavoriteQuizzes;