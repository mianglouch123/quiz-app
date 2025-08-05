import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import UseGetTotalQuizzesDoneByUserId from "../../hooks/quiz/UseGetTotalQuizzesDoneByUserId.jsx";
import UseGetAttempUserIdByQuizId from "../../hooks/quiz/UseGetAttempUserIdByQuizId.jsx";
import ResultsNotFound from "../../components/utils/ResultsNotFound.jsx";
import QuizCardAttemp from "../../components/global-components/QuizCardAttemps.jsx";
import OptionsCategories from "../../components/global-components/OptionsCategories.jsx";
import ModalQuizInfoAttemp from "../../components/headles-ui/ModalQuizInfoAttemp.jsx";

function MyAttemps() {
  const [data, setData] = useState([]);
  const [dataInfo, setDataInfo] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();
  const { getTotalQuizzesDone } = UseGetTotalQuizzesDoneByUserId();
  const { getAttempUserIdByQuizId } = UseGetAttempUserIdByQuizId();

  const userId = localStorage.getItem("user");

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    // 🟡 Cargar quizzes hechos por categoría
    async function fetchTotalQuizzes() {
    const categoryName = params.get("Category");
    

      const res = await getTotalQuizzesDone({
        userId,
        categoryName: categoryName || null,
      });
      if (res.ok) setData(res.data);
    }

    // 🟢 Cargar info del quiz si hay un ID en la URL
    async function fetchQuizAttemptsInfo() {
      
    const quizId = params.get("id");
   
      if (!quizId) return;
      const res = await getAttempUserIdByQuizId({
        userId,
        quizId,
        page: 1,
      });
      if (res.ok) {
        setDataInfo(res.data);
      }
    }

    fetchTotalQuizzes();
    fetchQuizAttemptsInfo();
  }, [location.search]);

  function handleOpenModal(state) {
    setIsOpen(state);
  }

  return (
    <div className="main-screen-primary">
      <OptionsCategories />

      <div className="flex flex-col md:flex-row items-center justify-start md:justify-center gap-4 py-12 md:gap-24">
        {/* Modal: solo cuando hay data */}
        {isOpen && dataInfo?.attemps && (
          <ModalQuizInfoAttemp
            isOpen={isOpen}
            setIsOpen={handleOpenModal}
            data={dataInfo}
            id={new URLSearchParams(location.search).get("id")}
          />
        )}

        {/* Contenido principal */}
        {data.length === 0 ? (
          <ResultsNotFound isShowed={true} />
        ) : (
          data.map((quiz) => (
            <QuizCardAttemp
              key={quiz.quizId || quiz.title}
              quiz={quiz}
              setIsOpen={handleOpenModal}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default MyAttemps;
