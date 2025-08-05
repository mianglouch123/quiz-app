import React, { useState , useEffect } from "react";
import UseGetUserInfo from "../../hooks/user/UseGetUserInfo.jsx";
import CardQuizMyProfile from "../../components/global-components/CardQuizMyProfile.jsx";
import CardQuizPlayedMyProfile from "../../components/global-components/CardQuizPlayedMyProfile.jsx";
import CardQuizAvgMyProfile from "../../components/global-components/CardQuizAvgMyProfile.jsx";
export default function MYProfile() {

const [data , setData] = useState([]);
const [isLoad , setLoad] = useState(null);
const [page , setPage] = useState(1);  
const [activeSection, setActiveSection] = useState(null);
const [showOptionQuiz, setShowOptionQuiz] = useState(null);

const userId = localStorage.getItem("user");
const { getUserInfo } = UseGetUserInfo();
  

  useEffect(() => {
  if(!userId) return null; 

  async function fetchUserInfo() {
  
  const res = await getUserInfo({ userId , page });
  setLoad(true);
  if(res.ok) {
  setData(res.data);
  }
  }

  fetchUserInfo();

 } , [page])
   
  function handlerSelectSection(sect) {
  if(activeSection && activeSection === sect) {
  setActiveSection(null);
  return;  
}
  setActiveSection(sect);
  }

function handleSetShowQuizOption(e, idx) {
  e.stopPropagation(); // 🔥 Detiene la propagación

  if (activeSection !== 1) return;

  if (showOptionQuiz === idx) {
    setShowOptionQuiz(null);
    return;
  }
  setShowOptionQuiz(idx);
}


 if(!isLoad) return null;

  return (
    <main className="flex items-center justify-center gap-4 flex-col py-8">
     
    <img className="h-[125px] w-[120px] object-fit md:w-[80xp] " src="/user-photo-icon.webp" alt="" />
   
    <section className="flex flex-col items-center justify-center gap-4 py-2">
    <h2 className="text-2xl font-semibold"> {data.userName.username} </h2>
    <div className="flex gap-4 flex-col justify-around items-center">
    <p>Total Quizzes Made : <b>{data.totalQuizzesMade}</b></p> 
    <p>Avg By All quizzes: <b>{data.avgGeneral[0].avgScore}</b></p>
   </div>
    </section>
 
      <section
        onClick={() => handlerSelectSection(1)}
        className={`flex flex-col items-center justify-start py-8 gap-4 w-[85%] transition-all duration-300 ease-in-out ${
          activeSection === 1 ? "max-h-[470px]" : "h-[50px]"
        } border border-gray-200 shadow-sm`}
      >
        <h2 className={`font-semibold ${
          activeSection === 1 ? "hidden" : ""
        }`} >My Quizzes</h2>

        { (data.quizzesDoneByUser.length > 0 && activeSection === 1) &&
        data.quizzesDoneByUser.map((quiz , idx) => (
         <CardQuizMyProfile key={quiz._id} quiz={quiz} pos={idx} showOptionQuiz={showOptionQuiz} handleSetShowQuizOption={handleSetShowQuizOption} />
        ))
        }
      

      </section>

      <section
        onClick={() => handlerSelectSection(2)}
        className={`flex flex-col items-center justify-start py-8 gap-4 w-[85%] transition-all duration-300 ease-in-out ${
          activeSection === 2 ? "max-h-[470px]" : "h-[50px]"
        } border border-gray-200 shadow-sm`}
      >
        <h2 className={`font-semibold ${
          activeSection === 2 ? "hidden" : ""
        }`} >My Attemps</h2>

       { (data.quizzesPlayed.length > 0 && activeSection === 2) &&
        data.quizzesPlayed.map((quiz , idx) => (
         <CardQuizPlayedMyProfile key={quiz.quizId} quiz={quiz} pos={idx} />
        ))
        }

    </section>

        <section
        onClick={() => handlerSelectSection(3)}
        className={`flex flex-col items-center justify-start py-8 gap-4 w-[85%] transition-all duration-300 ease-in-out ${
          activeSection === 3 ? "max-h-[470px]" : "h-[50px]"
        } border border-gray-200 shadow-sm`}
      >
        <h2 className={`font-semibold ${
          activeSection === 3 ? "hidden" : ""
        }`} >My Avg Score By Quiz</h2>

       { (data.avgByQuiz.length > 0 && activeSection === 3) &&
        data.avgByQuiz.map((quiz , idx) => (
         <CardQuizAvgMyProfile key={quiz._id} quiz={quiz} pos={idx} />
        ))
        }

    </section>
    
   </main>
  );
}
