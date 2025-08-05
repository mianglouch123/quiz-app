import React from "react"
import Option from "./Option";
import { useMemo } from "react";

function QuizCardCreate({quizData , setQuizData , question , showIdQuestion , setshowIdQuestion , questionId}) {

const optionsLetters = useMemo(() => "ABCDEFGHIJKLMNOPQRSTUWXYZ".split("") , []);

function handleOption(e, questionId, optionId) {
  const temp = [...quizData];
  const idxQuestionId = temp.findIndex(q => q.id === questionId);

  if (idxQuestionId === -1) return;


  const idxOptionId = temp[idxQuestionId].options.findIndex(op => op.id === optionId);

  if (idxOptionId === -1) {
    window.alert("Option not found");
    return;
  }

  const updatedOption = { ...temp[idxQuestionId].options[idxOptionId], option: e.target.value };
  temp[idxQuestionId].options[idxOptionId] = updatedOption;

  setQuizData(temp);
}


function handleSetCorrectOption(e, questionId, optionId) {
  const temp = [...quizData];

  const idxQuestionId = temp.findIndex(q => q.id === questionId);
  if (idxQuestionId === -1) return;

  const idxOptionId = temp[idxQuestionId].options.findIndex(op => op.id === optionId);
  if (idxOptionId === -1) return;

  // Si el checkbox fue marcado, desmarcamos todos los demás
  if (e.target.checked) {
    temp[idxQuestionId].options = temp[idxQuestionId].options.map((op, idx) => ({
      ...op,
      isCorrect: idx === idxOptionId, // solo uno será true
    }));
  } else {
    // Si se desmarca el que estaba activo, simplemente se pone false
    temp[idxQuestionId].options[idxOptionId].isCorrect = false;
  }

  setQuizData(temp);

}

function handleSetShowQuiz(questionId) {

console.log(questionId)
if(typeof questionId === "number" && questionId === showIdQuestion) {
setshowIdQuestion(null);
}
else {
setshowIdQuestion(questionId);

}

}


function setQuestionTitle(e, questionId) {

const value = e.target.value;

if(value.trim() === "") return;
const temp = [...quizData]

const idxQuestionId = temp.findIndex(q => q.id === questionId);

if(!idxQuestionId === -1) return;

const updateQuestion = {...temp[idxQuestionId] , questionText : value};

temp[idxQuestionId] = updateQuestion;

setQuizData(temp);


}

function handleDeleteQuestion(questionId) {


if(questionId >= 1 && question <= 3) {
window.alert("no puedes borrar ningun de los 3 primeros ids");
return;

}
const temp = [...quizData];

const findIdxQuestion = temp.findIndex(q => q.id === questionId);

if(findIdxQuestion === -1) return;

const updateData = temp.filter(questions => questions.id !== questionId);

setQuizData(updateData);

}


return (
<div key={question.id} className={`relative transition-all duration-150 flex flex-col items-start justify-start border border-white w-full ${showIdQuestion && showIdQuestion === question.id ? "h-[475px]" : "h-[75px]"} mt-4 gap-8`} >

<img onClick={() => handleSetShowQuiz(question.id)} className="absolute h-[25px] w-[25px] top-0 right-0 mr-4 mt-2 cursor-pointer" src={`${showIdQuestion && question.id === showIdQuestion ? "/arrow-up-solid.svg" : "/arrow-down-solid.svg"}`} alt="" />
<section className="flex w-[95%] text-white pl-4 py-4 font-semibold gap-6  ">
<p>{"Question : " + (questionId + 1)}</p>

<div className="flex ml-2 md:ml-12 items-center justify-center bg-none   border-slate-300 w-[64%] mt-2">
<input onChange={(e) => setQuestionTitle(e , question.id)}  className="font-semibold text-white bg-trasparent border-b-2 border-white w-full focus:outline-none px-4 pb-2" type="text" />
</div>

</section>

{

question?.options.length > 0 && question.options.map((option , optionId) => (
<Option
key={option.id}
handleOption={handleOption} question={question} option={option}
optionId={optionId} handleSetCorrectOption={handleSetCorrectOption} 
showIdQuestion={showIdQuestion} optionsLetters={optionsLetters}

 />

))

}

<div onClick={() => handleDeleteQuestion(question.id)} className={`${question.id > 3 && showIdQuestion === question.id ? "visible" : "invisible"} 
absolute bottom-0 right-0 mb-4 mr-4`}>
<img className="h-[20px]  w-[20px] md:w-[25px] cursor-pointer" src="/trash-solid.svg" alt="Delete question" />
</div>

</div>
)


}

export default QuizCardCreate