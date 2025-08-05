import React from "react";

function ResultsNotFound({ isShowed }) {

return (

<div className={`${isShowed ? "visible flex flex-col justify-start items-center mt-4 md:mt-12 py-4  gap-4  " : "invisible"}`}>

<img className="object-contain h-[180px] md:h-[215px] w-[325px]" src="/no-results.png" alt="Results Not found" />

<p className="text-2xl md:text-3xl text-[#1e61ef] font-semibold"> The results were not found</p>

</div>

)

}

export default ResultsNotFound
