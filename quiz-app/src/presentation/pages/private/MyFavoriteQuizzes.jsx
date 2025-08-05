import React from "react";
import { useState , useEffect } from "react";
import UseGetMyFavoriteQuizzes from "../../hooks/quiz/UseGetMyFavoritesQuizzes";
import QuizCardMyFavorites from "../../components/global-components/QuizCardMyFavorites.jsx";
export default function MyFavoriteQuizzes() {

const [data , setData] = useState([]);
const [params, setParams] = useState({ page : 1 , order : "desc" , sortBy : "PlayedAt" });
const [isLoaded , setLoad] = useState(false);
const options = [ {id: 1 , field : "Played At" } , { id: 2 , field : "score" } ];


const { getMyFavoriteQuizzes } = UseGetMyFavoriteQuizzes();

const userId = localStorage.getItem("user");

useEffect(() => {

if(!userId) return;

async function fetchMyFavoriteQuizzes() {

const res = await getMyFavoriteQuizzes({ userId , sortBy : params.sortBy , order : params.order , page: params.page  })


setLoad(true);

if(res.ok) {
setData(res.data)
}


}
fetchMyFavoriteQuizzes();

} , [userId , params, setParams]);

if(!isLoaded) return null;



return (

<div className="main-screen-primary"> 
  
  <div className="flex items-center justify-center pl-2 pr-2">
  <select
    className="w-[62%] md:w-[30%] max-w-full overflow-hidden truncate bg-white border border-gray-300 text-gray-700 py-2 px-3 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    onChange={(e) =>
      setParams((prev) => ({ ...prev, sortBy: e.target.value }))
    }
    value={params.sortBy}
  >
    {options.map((option) => (
      <option key={option.id} value={option.field}>
        {option.field}
      </option>
    ))}
  </select>
  </div>

  <div className="flex flex-col md:flex-row items-center justify-start md:justify-center gap-4 py-2 md:py-6 md:gap-24">

   

   
    {
      data.length === 0
        ? <div><ResultsNotFound isShowed={true}/></div>
        : data.map((quiz) => (
            <QuizCardMyFavorites  key={quiz.quizId|| quiz.title} 
             quiz={quiz}
             setData={setData}
                />
          ))
          
    }
  </div>
</div>

)

}