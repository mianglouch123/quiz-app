import React from "react"


function InputCreateQuizTitle({ quizTitle , setQuizTitle }) {
 

return (

<section className="flex flex mt-6 items-center justify-start gap-4 border border-white h-[75px] w-[90%] gap-4 px-4">

<div className="py px-4 rounded-sm py-2 bg-white text-black font-semibold">1</div>
<p className="text-white">Quiz Name : </p>

<div className="flex items-center justify-center bg-none   border-slate-300 w-[65%] mt-2">
<input onChange={(e) => setQuizTitle(e.target.value)} value={quizTitle} className="font-semibold text-white bg-trasparent border-b-2 border-white w-full focus:outline-none px-4 pb-2" type="text" />
</div>

</section>
)

}

export default InputCreateQuizTitle