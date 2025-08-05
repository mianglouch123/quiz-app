import UseDeleteQuiz from "../../hooks/quiz/UseDeleteQuiz.jsx";

export default function CardQuizMyProfile({ quiz, pos , showOptionQuiz, handleSetShowQuizOption }) {


   const { deleteQuiz } = UseDeleteQuiz();
   
   async function handleDeleteQuiz(quizId) {
   
   if(!quizId) return;
   const response = await deleteQuiz({ quizId });
     
    if(response.ok) {
    window.alert(`the quiz with ${quizId} was deleted sucessfully`);
    setTimeout(() => {
    window.location.reload()
   } , 500)
  
 }
   

  }

 if(!quiz._id) return null;  

  return (
    <div className="flex h-[70px] w-[95%] bg-white border border-gray-300 shadow-sm items-center justify-between px-4 rounded-md relative z-10">
      <div className="w-[30px] text-center ">
        <p className="font-bold text-[21px]">{parseInt(pos + 1)}</p>
      </div>

 {
  showOptionQuiz !== pos ? (
    <img
      onClick={(e) => handleSetShowQuizOption(e , pos)}
      className="absolute top-0 left-0 h-[15px] w-[15px] cursor-pointer"
      src="arrow-up-solid-full.svg"
      alt=""
    />
  ) : (
    <section className="transform visible origin-top transition-all duration-300 absolute top-0 left-0 
      h-[175px] w-[190px] border border-gray-200 shadow-md  bg-white  flex flex-col items-start justify-center pb-16 gap-2">
      <img
        onClick={(e) => handleSetShowQuizOption(e , pos)}
        className="h-[25px] w-[25px] absolute top-0 right-0 cursor-pointer"
        src="arrow-down-solid-full.svg"
        alt=""
      />
     
    <div className="flex  items-center justif-center gap-2">
     <img onClick={() => handleDeleteQuiz(quiz._id)} className="h-[25px] w-[25px]"  src="/trash-solid-full.svg" alt="" />
      <p className="text-[15px] font-semibold">delete the quiz</p>
    </div>

    <div className="flex items-center justif-center gap-2">
    <a href={`/update-quiz/${quiz._id}`}>     <img className="h-[25px] w-[25px]" src="/pen-solid-full.svg" alt="" />
 </a>
    <p className="text-[15px] font-semibold">Update a quiz</p>
   </div>
      
    </section>
  )
}

   <div className="w-[55px] flex justify-center">
        <img
          className="h-[45px] w-[45px] object-cover rounded-full"
          src="/user-photo-icon.webp"
          alt=""
        />
      </div>

      <div className="flex-1 px-2 truncate font-bold">
        <p title={quiz.title}>{quiz.title}</p>
      </div>

      <div className="w-[50px] flex items-center justify-end gap-1 font-bold">
        <img className="h-[15px] w-[15px]" src="/like-icon.svg" alt="" />
        <b>{quiz.totalLikes}</b>
      </div>
    </div>
  );
}
