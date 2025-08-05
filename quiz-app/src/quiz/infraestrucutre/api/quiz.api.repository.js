import { QuizRepository } from "../repositories/quiz.repository.js";
import axiosInstance from "../../../api/axiosInstance.js";
export class QuizApiRepository extends QuizRepository {

async createQuiz({ data }) {

try {

const response = await axiosInstance.post("/create-quiz" , data); 

return response.data;

}
catch(error) {

console.error("Create quiz API error:", error.response?.data || error.message);
throw error;
}


}

async updateQuiz({userId, title, quizId, data}) {

try {

const response = await axiosInstance.put(`/update-quiz/` , {

userId,
title,
quizId,
data

}); 

return response.data;

}
catch(error) {

console.error("Update quiz error:", error.response?.data || error.message);
throw error;
}

}

async getQuizzes({ params }) {

try {

if(typeof params === "object" && ("Category" in params) && params.Category) {

const response = await axiosInstance.get(`/get-quizzes?Category=${params.Category}`);

return response.data;
}


const response = await axiosInstance.get("/get-quizzes"); 
return response.data;
 
}
catch(error) {

console.error("Create quiz API error:", error.response?.data || error.message);
throw error;
}

}

async getQuizById({ id , params }) {

try {

if(typeof params === "object" && ("quizInfo" in params) && params.quizInfo) {
const response = await axiosInstance.get(`/get-quiz/${id}?quizInfo=${1}`);
return response.data;

}

const response = await axiosInstance.get(`/get-quiz/${id}`); 

return response.data;
}

catch(error) {
console.error("Create quiz API error:", error.response?.data || error.message);
throw error;
}




}

async deleteQuiz ({ quizId }) {
try {

const response = await axiosInstance.delete(`/delete-quiz/${quizId}`)
return response.data;

}
catch(error) {

console.error("Create deleting the quiz by id:", error.response?.data || error.message);
throw error;

}
}

async getTotalUsersByQuizId({ id , page }) {

try {

const response = await axiosInstance.get(`/getTotalUsersByGameId/${id}?page=${page}`)
return response.data;

}
catch(error) {

console.error("Create getting total users by quiz id API error:", error.response?.data || error.message);
throw error;

}



}

async takeQuiz({ userId, quizId, data }) {

try {

const response = await axiosInstance.post(`/take-quiz` , {
userId,
quizId,
data

});

return response.data;

}
catch(error) {

console.error("Create getting total users by takeQuiz API error:", error.response?.data || error.message);
throw error;

}

}

async getMyFavoritesQuizzes({ userId , sortBy , order , page }) {

try {

if(!userId) {
throw Error("params is missing")

}

const sortByRaw = sortBy !== undefined ? sortBy : "playedAt";
const orderRaw = order !== undefined ? order : "desc";

const response = await axiosInstance.get(`/my-favorites/${userId}?sortBy=${sortByRaw}&order=${orderRaw}&page=${page}`)

return response.data;

}
catch(error) {

console.error(
      "Error getting my favorites quizzes",
      error.response?.data || error.message
    );
    throw error;
}

}

async checkQuizLikedByUserId({ userId , quizId }) {

try {

if(!userId || !quizId) {

throw Error("params is missing")

}

const response = await axiosInstance.get(`/check-quiz-liked-by-userId?userId=${userId}&quizId=${quizId}`);

return response.data;


}
catch (error) {
    console.error(
      "Error getting if the quiz is liked from the user",
      error.response?.data || error.message
    );
    throw error;
  }

}

async getAttempUserIdByQuizId({ userId , quizId , page }) {

try {

if(!userId || !quizId) {

throw Error("params is missing")

}

const response = await axiosInstance.get(`/attemps-by-quizId-userId?userId=${userId}&quizId=${quizId}&page=${page}`)

return response.data;


}
catch (error) {
    console.error(
      "Error getting total attempts done by a user (getMyAttempts API error):",
      error.response?.data || error.message
    );
    throw error;
  }

}

async addFavoriteQuiz({ userId, quizId }) {

try {
const response = await axiosInstance.post("/add-favorite-quiz" , { userId, quizId });

return response.data;

}

catch(error) {
console.error(
      "Error getting total attempts done by a user (getMyAttempts API error):",
      error.response?.data || error.message
    );
    throw error;
}

}


async deleteFavoriteQuizById({ userId , quizId }) {

try {
const response = await axiosInstance.delete(`/delete-favorite-quiz?userId=${userId}&quizId=${quizId}`);

return response.data;

}

catch(error) {
console.error(
      "Error at the moment to delete favorite quiz by id",
      error.response?.data || error.message
    );
    throw error;
}
}



async geTotalQuizzesDone( { userId, categoryName } ) {

 try {
    const params = { userId };
    if (categoryName) {
      params.categoryName = categoryName;
    }

   console.log(params)

    const response = await axiosInstance.get('/get-total-quizzes-done-by-user-id', {
      params
    });

    return response.data;
  } catch (error) {
    console.error(
      "Error getting total attempts done by a user (getMyAttempts API error):",
      error.response?.data || error.message
    );
    throw error;
  }

}
}