import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UseGetQuizById from "../../hooks/quiz/UsegetQuizById";
import InputCreateQuizTitle from "../../components/Quiz/InputCrateQuizTitle.jsx";
import QuizCardUpdate from "../../components/global-components/QuizCardUpdate.jsx";
import UseUpdateQuiz from "../../hooks/quiz/UseUpdateQuiz.jsx";


export default function UpdateQuiz() {
  const [quizData ,setDataQuiz] = useState(null);
  const [quizTitle , setQuizTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [showIdQuestion , setshowIdQuestion] = useState(null);


  const { quizId } = useParams();
  const { getQuizById } = UseGetQuizById();
  const { updateQuiz } = UseUpdateQuiz();

  const userId = localStorage.getItem("user")

  useEffect(() => {

  if(!quizId) return;

  async function fetchQuizById() {

  const res = await getQuizById({ id: quizId , params : {} })
  if(res.ok) {
  setDataQuiz(res.data);
  setQuestions(res.data[0].questions);
  setQuizTitle(res.data[0].title);

 }
   
}
  
  fetchQuizById();

} , [quizId , userId])

async function handleFormData(e) {

e.preventDefault();

const mapOptions = questions.map(op => op.options).flat();
const mapTitles = questions.map(dt => dt.question).flat();
const checkTitleText = mapTitles.some(dt => dt === "" || !dt);


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


const checkAllOptionsCorrect = mapCorrectOptions.length === quizData[0].questions.length;

if(!quizTitle) {
window.alert("quizTitle missing")
return;
}

if(!checkAllOptionsCorrect) {
window.alert("You gotta send a one correct answer per question")
return;
}




const ids = new Set();

for(const dt of questions) {
for(const op of dt.options) {
ids.add(op.questionId);
}
}
const normalizeIds = Array.from(ids);

const mappedQuestions = questions.map((dt , idx) => ({
...dt,
questionId: normalizeIds[idx]
}))


const response = await updateQuiz({ 
userId , 
title : quizTitle , 
quizId : quizData[0]._id,
data : mappedQuestions 

})



if(response.ok) {
window.alert("quiz updated sucessfully , the page will refresh");

setTimeout(() => {

window.location.reload();

} , 500)

}



}



if(!quizData) return null;



return (

  <div className="relative flex flex-col justify-start items-center py-12 gap-4 min-h-screen bg-gradient-to-br from-[#1E63F2] to-[#1D4ED8] overflow-hidden pb-22">
  {/* Círculo difuso en el fondo */}
<div className="absolute top-[-50px] right-[-50px] w-[200px] h-[200px] bg-white/20 rounded-full blur-3xl mix-blend-overlay" > </div>


<div className="flex flex-col items-center justify-center mt-12 text-[#ffffff] gap-4">
<h2 className="font-semibold text-3xl">Update the quiz</h2>
<p className="text-[18px]">Update the quiz  <b> {quizData[0]?.title || ""}</b></p>
</div>


{/*Input Create Quiz Title Component*/}

<InputCreateQuizTitle quizTitle={quizTitle} setQuizTitle={setQuizTitle} />


<form className="flex flex-col mt-6 items-start justify-start pt-8 gap-4 border border-white h-full w-[90%] gap-4 px-4 py-8">

<div className="py px-4 rounded-sm py-2 bg-white text-black font-semibold">2</div>
<p className="text-white">Quiz Questions : </p>

{questions.map((dt, questionId) => (
<QuizCardUpdate 
key={dt._id}
questionData={questions}
setQuestionData={setQuestions}
question={dt}
showIdQuestion={showIdQuestion}
setshowIdQuestion={setshowIdQuestion}
questionId={questionId}

 />
))}

</form>


<input onClick={handleFormData} className="
bg-white text-[#1e59e6] font-bold
h-[40px] w-[50%] md:w-[275px] rounded-full cursor-pointer mt-4
" type="submit" value="Send Data" />
</div>

)

}