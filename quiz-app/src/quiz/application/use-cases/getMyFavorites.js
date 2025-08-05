export const GetMyFavoritesQuizzes = (apiRepository) => async ({ userId, sortBy , order , page }) => {

const res = await apiRepository.getMyFavoritesQuizzes({ userId , sortBy , order , page });

return res;

}