function Option( {handleOption , question , option , optionId , handleSetCorrectOption , optionsLetters , showIdQuestion} ) {

return (

<div className={`flex w-[75%] justify-center items-center gap-4 ${showIdQuestion && showIdQuestion === question.id ? "" : "hidden"} `} key={option.id}>

<section className="bg-white ml-4 py-2 px-3 rounded-sm text-black">{optionsLetters[optionId]}:</section>

<div className="flex items-center justify-center bg-none   border-slate-300 w-[95%] mt-2">

<input
  onChange={(e) => handleOption(e, question.id, option.id)}
  value={option.option}
  className="font-semibold text-white bg-transparent border-b-2 border-white w-full focus:outline-none px-4 pb-2 "
  type="text"
/>


</div>

<div className="flex flex-col items-center justify-center gap-2">

<input
  className="px-4 rounded-[50%]"
  type="checkbox"
  checked={option.isCorrect || false}
  onChange={(e) => handleSetCorrectOption(e, question.id, option.id)}
/>
</div>




</div>

)

}

export default Option