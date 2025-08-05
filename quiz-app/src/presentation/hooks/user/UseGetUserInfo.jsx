import React from "react";
import { useMemo, useCallback } from "react";
import { UserApiRepository } from "../../../user/infrastructure/api/user.api.repository.js";
import { GetUserInfo } from "../../../user/application/use-cases/getUserInfo.user.js";

function UseGetUserInfo() {


const userRepository = useMemo(() => new UserApiRepository() , []);

const getUserInfoUseCase = useMemo(() => GetUserInfo(userRepository) , [userRepository]);

const getUserInfo = useCallback(async ({ userId , page }) => {

const response = await getUserInfoUseCase({ userId , page });

return response;

} , [getUserInfoUseCase])


return { getUserInfo }

}

export default UseGetUserInfo