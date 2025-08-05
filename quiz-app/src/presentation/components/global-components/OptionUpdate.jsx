export default function OptionUpdate({ 
  handleOption, 
  question, 
  option, 
  optionId, 
  handleSetCorrectOption, 
  optionsLetters, 
  showIdQuestion 
}) {
  return (
    <div className={`flex w-[75%] justify-center items-center gap-4 ${
      showIdQuestion === question._id ? "" : "hidden"
    }`}>
      <section className="bg-white ml-4 py-2 px-3 rounded-sm text-black">
        {optionsLetters[optionId]}:
      </section>

      <div className="flex items-center justify-center w-[95%] mt-2">
        <input
          onChange={(e) => handleOption(e, question._id, option._id)}
          value={option.option}
          className="font-semibold text-white bg-transparent border-b-2 border-white w-full px-4 pb-2 focus:outline-none"
          type="text"
        />
      </div>

      <div className="flex flex-col items-center justify-center gap-2">
        <input
          className=""
          type="checkbox"
          checked={option.isCorrect || false}
          onChange={(e) => handleSetCorrectOption(e, question._id, option._id)}
        />
      </div>
    </div>
  );
}