import axiosInstance from "../../../api/axiosInstance.js";
import { UserRepository } from "../repositories/user.repository.js";
export class UserApiRepository extends UserRepository {

async login({ username, password }) {
  try {
    const response = await axiosInstance.post("/login", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    // Aquí puedes relanzar o manejar el error para que lo capture quien llama a `login`
    console.error("Login API error:", error.response?.data || error.message);
    throw error;
  }
}

async register({ username , password }) {
  
   try {
    const response = await axiosInstance.post("/register", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    // Aquí puedes relanzar o manejar el error para que lo capture quien llama a `login`
    console.error("Login API error:", error.response?.data || error.message);
    throw error;
  }
  
}


async getUserById({ id }) {

try {
  
const response = await axiosInstance.get(`/get-user/${id}`);

return response.data;

}
 catch(error) {
  console.error("Login API - FRONT GET USER BY ID error:", error.response?.data || error.message);
  throw error;
 }
}

async getUserInfo({ userId, page }) {

try {
  
const response = await axiosInstance.get(`/get-user-info-by-id/${userId}?page=${page}`);

return response.data;

}
 catch(error) {
  console.error("Login API - FRONT GET USER INFO BY ID error:", error.response?.data || error.message);
  throw error;
 }
}

}

