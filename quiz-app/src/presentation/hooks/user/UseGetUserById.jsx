import React from "react";
import { useMemo, useCallback } from "react";

import { UserApiRepository } from "../../../user/infrastructure/api/user.api.repository.js";

import { GetUserById } from "../../../user/application/use-cases/getUserById.user.js";

function UseGetUserById() {


const userRepository = useMemo(() => new UserApiRepository() , []);

const getUserByIdUseCase = useMemo(() => GetUserById(userRepository) , [userRepository]);

const getUserById = useCallback(async ({ id }) => {

const response = await getUserByIdUseCase({ id });

return response;

} , [getUserByIdUseCase])


return { getUserById }

}

export default UseGetUserById