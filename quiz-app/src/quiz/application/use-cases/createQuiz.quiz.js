import { Quiz } from "../../domain/entities/Quiz.entitie.js";

export const CreateQuiz = (quizRepository) => async ( { data } ) => {

let { userId , quizTitle, categoryName , questions } = data;

if(!userId) throw Error("User Id not Sended");

if(!quizTitle) throw Error("Category Name not sended");

if(!Array.isArray(questions) || (Array.isArray(questions) && questions.length === 0)) {
throw Error("Error in Array question sended");
}

if(categoryName.trim() === "") {
categoryName = "any interest";
}

const res = await quizRepository.createQuiz({ data });

return res;



}