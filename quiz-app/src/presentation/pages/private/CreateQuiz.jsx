import React from "react";
import { useState } from "react";
import InputCreateQuizTitle from "../../components/Quiz/InputCrateQuizTitle.jsx";
import QuizCardCreate from "../../components/global-components/QuizCardCreate.jsx";
import CategoriesCreateQuiz from "../../components/Quiz/CategoriesCreateQuiz.jsx";
import { mockQuizData } from "../../components/mocks/quizData.js";
import UseCreateQuiz from "../../hooks/quiz/useCreateQuiz.jsx";
function CreateQuiz() {

const [quizTitle , setQuizTitle] = useState("");
const [showIdQuestion , setshowIdQuestion] = useState(null);
const [selectedCategory , setSelectedCategory] = useState("Sports");
const [quizData , setQuizData] = useState(mockQuizData);

const { createQuiz } = UseCreateQuiz();

async function handleFormData(e) {
e.preventDefault();

console.log("handler")

try {

const mapOptions = quizData.map(op => op.options).flat();
const mapTitles = quizData.map(dt => dt.questionText).flat();
const checkTitleText = mapTitles.some(dt => dt === "" || !dt);

console.log(checkTitleText)
if(checkTitleText) {
window.alert("All questions need a questionText");
return;

}

const checkTextOptions = mapOptions.some(op => op.option === "" || !op.option);

if(checkTextOptions) {
window.alert("All questions need an option");
return;

}

const mapCorrectOptions = ( mapOptions.filter(dt => dt.isCorrect)) || [];


const checkAllOptionsCorrect = mapCorrectOptions.length === quizData.length;




if(!quizTitle) {
window.alert("quizTitle missing")
return;
}

if(!checkAllOptionsCorrect) {
window.alert("You gotta send a one correct answer per question")
return;
}

const userId = localStorage.getItem("user");

const cleanedQuestions = quizData.map(q => ({
  questionText: q.questionText,
  options: q.options.map(opt => ({
    option: opt.option,
    isCorrect: opt.isCorrect
  }))
}));


const dataForm = { 
  userId, 
  quizTitle, 
  categoryName: selectedCategory.toLowerCase(), 
  questions: cleanedQuestions
};



const response = await createQuiz({ data : dataForm });


if(response.ok) {
  window.alert("Data sended correctly the page will refresh");
  setTimeout(() => {
   window.location.href = "/";
   } , 500)
}


}

catch(error) {

console.error("Error in Client componet Create Quiz " + error.name)
}


}

function handleAddQuestion() {

const temp = [...quizData];

const quizDataForm = {

id: temp.length + 1,
questionText : "",
options : new Array(1).fill().map((_ , idx) => new Array(5).fill().map((_ , jIdx) => ({
id: jIdx + 1,
option : "",
isCorrect : false


}) )).flat(1)

}



temp.push(quizDataForm);

setQuizData(temp);

}



return (
<div className="relative flex flex-col justify-start items-center py-12 gap-4 min-h-screen bg-gradient-to-br from-[#1E63F2] to-[#1D4ED8] overflow-hidden pb-22">
  {/* Círculo difuso en el fondo */}
<div className="absolute top-[-50px] right-[-50px] w-[200px] h-[200px] bg-white/20 rounded-full blur-3xl mix-blend-overlay" > </div>


<div className="flex flex-col items-center justify-center mt-12 text-[#ffffff] gap-4">
<h2 className="font-semibold text-3xl">Create a quiz</h2>
<p className="text-[18px]">You gotta create a quiz min 5 answers or more</p>
</div>


{/*Input Create Quiz Title Component*/}

<InputCreateQuizTitle quizTitle={quizTitle} setQuizTitle={setQuizTitle} />

<form className="flex flex-col mt-6 items-start justify-start pt-8 gap-4 border border-white h-full w-[90%] gap-4 px-4 py-8">

<div className="py px-4 rounded-sm py-2 bg-white text-black font-semibold">2</div>
<p className="text-white">Quiz Questions : </p>


{

quizData.map((quiz , questionId) => (

<QuizCardCreate 
key={quiz.id}
quizData={quizData} 
setQuizData={setQuizData}
question={quiz}
showIdQuestion={showIdQuestion}
setshowIdQuestion={setshowIdQuestion}
questionId={questionId}


  />

))

}

</form>

<CategoriesCreateQuiz 
selectedCategory={selectedCategory} 
setSelectedCategory={setSelectedCategory} />


<input onClick={handleFormData} className="
bg-white text-[#1e59e6] font-bold
h-[40px] w-[50%] md:w-[275px] rounded-full cursor-pointer mt-4
" type="submit" value="Send Data" />



<div onClick={handleAddQuestion} className="flex absolute bottom-0 right-0 mr-6 items-center justify-center py-2 
px-4 md:py-4 md:px-4 bg-blue-600 mb-2
rounded-[50%] border border-blue-500 cursor-pointer z-[1] py-4">
<img className="h-[25px] w-[25px]" src="/plus-solid.svg" alt="Add question" />
</div>

</div>


)

}


export default CreateQuiz