import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UseGetQuizById from "../../hooks/quiz/UsegetQuizById.jsx";
import TakeQuizOptionRender from "../../components/global-components/TakeQuizOptionRender.jsx";
import UseTakeQuiz from "../../hooks/quiz/UseTakeQuiz.jsx";

function TakeQuizById() {
  const [data , setData] = useState([]);
  const [quizData, setQuizData] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [totalScore, setTotalScore] = useState(null);
  const { quizId } = useParams();
  const { getQuizById } = UseGetQuizById();
  const { takeQuiz } = UseTakeQuiz();
  const userId = localStorage.getItem("user");
 

  useEffect(() => {
    if (!quizId) return;

    async function fetchQuizById() {
      const res = await getQuizById({ id: quizId, params: {} });

      if (res.ok) {
        setQuizData(res.data);
        setQuestions(res.data[0].questions);
      }
    }

    fetchQuizById();
  }, [quizId]);

  
  useEffect(() => {
  if (!quizData || !userId) return;

  if (quizData[0].questions.length === data.length) {
    async function sendAnswers() {
      const res = await takeQuiz({ userId, quizId, data });
      if (res.ok) {
        setTotalScore(res.data.score);
      }
    }

    sendAnswers();
  }
}, [quizData, data.length]);


   
  function handleSetOption(questionId, optionId) {
   const temp = [...questions];
   temp.shift();
   setQuestions(temp);
   setData(prev => [...prev , {questionId , optionId}]);
   
  }

  if (!quizData) return null;
    

  console.log(data);

  return (
    <main className="relative flex flex-col justify-start items-center py-12 gap-4 min-h-screen bg-gradient-to-br from-[#1E63F2] to-[#1D4ED8] overflow-hidden pb-22">
      <div className="flex flex-col items-center justify-center mt-12 text-[#ffffff] gap-4 w-full">
        <h2 className="font-semibold text-3xl mt-4">Take quiz</h2>
        <p className="text-[18px]">
          Let's do <b>{quizData[0].title}</b> quiz
        </p>

      {!questions.length && (quizData[0].questions.length === data.length) ? (
      <div className="flex flex-col items-center justify-center gap-8 text-white mt-8"> 
      <h2>Question End</h2> 
      <p className="">Congratulations, thanks to play this quiz</p>
      <h2 className=""> Total: <b>{totalScore || 0}</b></h2>
     <a href="/" className='mt-8 flex items-end justify-end'>
                    <button
                      className='bg-blue-500 cursor-pointer text-white rounded-full pl-8 pr-8 text-center h-[50px] w-[175px]'
                    >
                      Go to the Home
                    </button>
                  </a>
     </div>

     ) : 
     (

       <div className="flex items-center flex-col justify-center gap-4 mt-8 w-full">
       <p className="font-bold text-2xl">{parseInt((quizData[0].questions.length - questions.length) + 1)}</p>
       <h2 className="font-semibold text-[18px]">{questions[0].question || ""}</h2>
        <ul className="flex items-center justify-center gap-6 flex-col mt-8 w-[100%]">
        {
       questions[0].options.length && questions[0].options.map((op) => (
       <TakeQuizOptionRender key={op._id} option={op} handleSetOption={handleSetOption} />
       ))       
        }
       </ul>
     
      </div> 
     )


   }
       
     
       
      </div>
    </main>
  );
}

export default TakeQuizById;
