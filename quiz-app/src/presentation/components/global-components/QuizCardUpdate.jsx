import React from "react";
import { useMemo } from "react";
import OptionUpdate from "./OptionUpdate.jsx";

export default function QuizCardUpdate({questionData , setQuestionData , question , showIdQuestion , setshowIdQuestion , questionId}) {

const optionsLetters = useMemo(() => "ABCDEFGHIJKLMNOPQRSTUWXYZ".split("") , []);


function handleSetShowQuiz(questionId) {

if(questionId === showIdQuestion) {
setshowIdQuestion(null);
}
else {
setshowIdQuestion(questionId);

}



}

function handleOption(e , questionId, optionId) {

const temp = [...questionData];
const idxQuestionId = temp.findIndex(q => q._id === questionId);

if(idxQuestionId === -1) return;


  const idxOptionId = temp[idxQuestionId].options.findIndex(op => op._id === optionId);

  if (idxOptionId === -1) {
    return;
  }

  const updateOption = {...temp[idxQuestionId].options[idxOptionId] , option : e.target.value};
  
  temp[idxQuestionId].options[idxOptionId] = updateOption;

  setQuestionData(temp);
 

}


function handleSetCorrectOption(e, questionId, optionId) {
  

  setQuestionData(prevQuestions => {
    return prevQuestions.map(question => {
      if (question._id !== questionId) return question;
      
      // Crear nuevas opciones con el cambio aplicado
      const newOptions = question.options.map(option => ({
        ...option,
        isCorrect: option._id === optionId ? e.target.checked : false
      }));
      
      return {
        ...question,
        options: newOptions
      };
    });
  });
}


function setQuestionTitle(e , questionId ) {

const temp = [...questionData];
const idxQuestionId = temp.findIndex(q => q._id === questionId);

if(idxQuestionId === -1) return;

const updateRegister = {...questionData[idxQuestionId] , question : e.target.value};

temp[idxQuestionId] = updateRegister;

setQuestionData(temp);



}


return (

<div className={`relative transition-all duration-150 flex flex-col items-start justify-start border border-white w-full ${showIdQuestion && showIdQuestion === question._id ? "h-[475px]" : "h-[75px]"} mt-4 gap-8`} >

<img onClick={() => handleSetShowQuiz(question._id)} className="absolute h-[25px] w-[25px] top-0 right-0 mr-4 mt-2 cursor-pointer" src={`${showIdQuestion && question._id === showIdQuestion ? "/arrow-up-solid.svg" : "/arrow-down-solid.svg"}`} alt="" />
<section className="flex w-[95%] text-white pl-4 py-4 font-semibold gap-6  ">
<p>{"Question : " + (questionId + 1)}</p>

<div className="flex ml-2 md:ml-12 items-center justify-center bg-none   border-slate-300 w-[64%] mt-2">
<input onChange={(e) => setQuestionTitle(e , question._id)}  className="font-semibold text-white bg-trasparent border-b-2 border-white w-full focus:outline-none px-4 pb-2" type="text" value={question.question}  />


</div>

</section>

{

question?.options.length > 0 && question.options.map((option , optionId) => (
<OptionUpdate
key={option._id}
handleOption={handleOption} 
question={question} 
option={option}
optionId={optionId} 
handleSetCorrectOption={handleSetCorrectOption} 
showIdQuestion={showIdQuestion} optionsLetters={optionsLetters}

 />

))

}

</div>
)

}