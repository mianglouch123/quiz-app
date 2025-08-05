export const RegisterUser = (userRepository) => async ({ username , password }) => {
 
const data = await userRepository.register({ username , password });

 return data;

} 