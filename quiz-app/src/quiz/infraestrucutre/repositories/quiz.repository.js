export class QuizRepository {

async createQuiz({ data }) {

throw new Error("method createQuiz no implemented");

}

async takeQuiz({ userId, quizId, data }) {
throw new Error("method takeQuiz no implemented");

}

async getQuizById({ id , params }) {
throw new Error("method takeQuiz no implemented");

}

async getTotalUsersByQuizId({ id , page }) {
throw new Error("method getTotalUsersByQuizId no implemented");

}

async getAttempUserIdByQuizId({ userId , quizId , page }) {
throw new Error("method getAttempUserIdByQuizId no implemented");

}

async getQuizzes({ params }) {
throw new Error("method getQuizzes no implemented");


}

async addFavoriteQuiz({ userId, quizId }) {
throw new Error("method  addFavoriteQuiz no implemented");

}

async geTotalQuizzesDone({ userId }) {

throw new Error("method getQuizzes no implemented");

}

async  checkQuizLikedByUserId({ userId , quizId }) {
throw new Error("method checkQuizLikedByUserId no implemented");

}


}