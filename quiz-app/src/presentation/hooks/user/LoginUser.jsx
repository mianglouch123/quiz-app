import { useMemo , useCallback } from "react";
import { UserApiRepository } from "../../../user/infrastructure/api/user.api.repository.js";
import { LoginUser } from "../../../user/application/use-cases/login.user.js";

function UseUserLogin () {

const userRepository = useMemo(() => new UserApiRepository() , []);
  const loginUserUseCase = useMemo(() => LoginUser(userRepository), [userRepository]);

  const login = useCallback(async ({ username, password }) => {
  const data = await loginUserUseCase({ username, password });

  return data;
  
}, [loginUserUseCase]);



return { login }
}

export default UseUserLogin;