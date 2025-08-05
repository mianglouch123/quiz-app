import { useCallback, useMemo } from "react";
import { RegisterUser } from "../../../user/application/use-cases/register.user.js";
import { UserApiRepository } from "../../../user/infrastructure/api/user.api.repository.js";

function UseUserRegister() {
  const userRepository = useMemo(() => new UserApiRepository(), []);
  const registerUserUseCase = useMemo(() => RegisterUser(userRepository), [userRepository]);

  const register = useCallback(async ({ username, password }) => {
    const data = await registerUserUseCase({ username, password });
    return data;
  }, [registerUserUseCase]);

  return { register };
}

export default UseUserRegister;
