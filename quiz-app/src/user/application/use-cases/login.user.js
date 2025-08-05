export const LoginUser = (userRepository) => async ({ username , password }) => {

const data = await userRepository.login({ username , password });

return data;

}