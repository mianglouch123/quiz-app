export const GetUserById = (userRepository) => async ({ id }) => {

const data = await userRepository.getUserById({ id });

return data;

}