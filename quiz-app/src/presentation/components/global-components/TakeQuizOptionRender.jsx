import React from "react"

function TakeQuizOptionRender({ option, handleSetOption }) {



return (

<li onClick={() => handleSetOption(option.questionId , option._id)} className="flex items-center justify-center text-center font-bold bg-white text-blue-500 w-[90%] md:w-[470px]  h-[60px] hover:bg-[#d1c906] cursor-pointer hover:text-white">

{option.option}

</li>

)

}

export default TakeQuizOptionRender;