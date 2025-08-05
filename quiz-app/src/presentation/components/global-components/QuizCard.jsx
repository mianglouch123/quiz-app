import React from "react";
import { useState  , useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UseFavoriteQuiz from "../../hooks/quiz/UseAddFavoriteQuiz.jsx";
import UseDeleteFavoriteQuizId from "../../hooks/quiz/UseDeleteFavoriteQuizId.jsx";
import UseCheckQuizIsLikedByUserId from "../../hooks/quiz/UseCheckQuizIsLikedByUserId.jsx";

function QuizCard({ quiz , setIsOpen}) {
const [likedState, setLikedState] = useState({ loaded: false, liked: false });
const location = useLocation();
const navigate = useNavigate();
const { addFavoriteQuiz } = UseFavoriteQuiz();
const { deleteFavoriteQuizById } = UseDeleteFavoriteQuizId();
const { checkQuizIsLikedByUserId } = UseCheckQuizIsLikedByUserId();
const userId = localStorage.getItem("user");

useEffect(() => {

if(!quiz._id) return;

async function checkQuizIsLiked() {
 
const res = await checkQuizIsLikedByUserId({ userId , quizId : quiz._id });
setLikedState({ loaded: true, liked: res.ok && res.check });

}

checkQuizIsLiked();

} , [quiz._id , userId]) 


async function handleAddFavoriteQuiz(_id) {


const res = await addFavoriteQuiz({ userId , quizId : _id });

if(!res.ok && res.message.trim() === "the user has liked this quiz previously") {

const res = await deleteFavoriteQuizById({ userId, quizId : _id });
setLikedState({ loaded: true, liked: false });
if(res.ok) window.alert(`the quiz: ${_id} was removed to your favorites`);

return;
}

if(res.ok) {
window.alert("quiz favorite added");
setLikedState({ loaded: true, liked: true });
}


}


function handleSetQuizOption( _id) {


setIsOpen(true)

const params = new URLSearchParams(location.search);
const id = params.get("id");


if(id) {
params.delete("id");
}
params.append("id" , _id.toString())


navigate({ search: params.toString() } , { replace: true })
}


return (

<main className="flex relative flex-col items-center justify-start py-12 h-[340px] w-[350px] bg-[#ffffff] rounded-md shadow-md" >
<section className="flex items-center justify-center h-[190px] w-[310px] bg-blue-600 text-white rounded-md">
<img className="h-[35px] w-[35px]" src="/code-solid.svg" alt="" />
</section>

<div className="flex items-center justify-center py-8 flex-col gap-4">

<h2 className="font-bold">{quiz.title}</h2>
<p className="text-gray-500 font-semibold text-[18px]">
{quiz.questions.length.toString()} question(s)</p>

</div>

<div className="flex gap-4  items-center justify-center absolute bottom-0 left-0 ml-8 mb-[29px]">
{ !likedState.loaded ? null : (
  likedState.liked ? (
    <img onClick={() => handleAddFavoriteQuiz(quiz._id)} className="h-[25px] w-[25px] cursor-pointer"  src="/heart-solid-like.svg" alt="Quiz is favorite" />
  ) : (
    <img onClick={() => handleAddFavoriteQuiz(quiz._id)} className="h-[25px] w-[25px] cursor-pointer"  src="/heart-solid-2.svg" alt="Add favorite" />
  )
)}
</div>


<div className="flex gap-4  items-center justify-center absolute bottom-0 right-0 mr-8 mb-6">
<img onClick={() => handleSetQuizOption(quiz._id.toString())} className="h-[35px] w-[35px] cursor-pointer" src="/circle-info-solid-2.svg" alt="quiz Info" />

<a href={`/take-quiz/${quiz._id}`}><img className="h-[35px] w-[35px] cursor-pointer" src="/circle-play-solid-icon.svg" alt="Do the quiz" /></a>
</div>

</main>
)

}

export default QuizCard