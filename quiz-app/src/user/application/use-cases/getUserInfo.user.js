export const GetUserInfo = (userRepository) => async ({ userId, page }) => {

const res = await userRepository.getUserInfo({ userId, page });

return res;

}

