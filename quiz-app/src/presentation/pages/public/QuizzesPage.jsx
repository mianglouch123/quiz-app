import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import OptionsCategories from "../../components/global-components/OptionsCategories.jsx";
import UseFetchQuizzes from "../../hooks/quiz/UseFetchQuizzes.jsx";
import UseGetQuizById from "../../hooks/quiz/UsegetQuizById.jsx";
import ResultsNotFound from "../../components/utils/ResultsNotFound.jsx";
import ModalQuizInfo from "../../components/headles-ui/ModalQuizInfo.jsx";
import QuizCard from "../../components/global-components/QuizCard.jsx";

function QuizzesPage() {
  const [data, setData] = useState([]);
  const [dataInfo , setDataInfo] = useState([]);
  const [isOpen , setIsOpen] = useState(false);
  const { getQuizzes } = UseFetchQuizzes();
  const { getQuizById } = UseGetQuizById();
  const location = useLocation(); // ✅ forma correcta de obtener location
  
 

  useEffect(() => {
    async function fetchData() {
      const params = new URLSearchParams(location.search);
      const category = params.get("Category");

      const response = await getQuizzes({
        params: category ? { Category: category } : {},
      });

      if (response.ok) setData(response.data);
    }

   async function fetchQuizById() {
    const params = new URLSearchParams(location.search);
    const id = params.get("id")
 
    if(!id) return;

    
    const response = await getQuizById({id , params :id ? {quizInfo: true} : {} });
    if(response.ok) setDataInfo(response.data)

 
   }

    fetchData();
    fetchQuizById();
  }, [location.search]);

function handleOpenModal(state) {
  setIsOpen(state);
}

console.log()

  return (
    <main className="main-screen-primary">
  <OptionsCategories />

  <div className="flex flex-col md:flex-row items-center justify-start md:justify-center gap-4 py-2 md:py-6 md:gap-24">
  {isOpen && (   
  <ModalQuizInfo
  isOpen={isOpen}
  setIsOpen={handleOpenModal}
  data={dataInfo}
  id={new URLSearchParams(location.search).get("id")}
/>
)}   
    {
      data.length === 0
        ? <div><ResultsNotFound isShowed={true}/></div>
        : data.map((quiz) => (
            <QuizCard  key={quiz._id || quiz.name} quiz={quiz} 
               setIsOpen={handleOpenModal} />
          ))
          
    }
  </div>
</main>

  );
}

export default QuizzesPage;
