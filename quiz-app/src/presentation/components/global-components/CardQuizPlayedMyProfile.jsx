export default function CardQuizPlayedMyProfile({ quiz, pos }) {
  return (
    <div className="flex h-[70px] w-[95%] bg-white border border-gray-300 shadow-sm items-center justify-between px-4 rounded-md">
      <div className="w-[30px] text-center">
        <p className="font-bold text-[21px]">{parseInt(pos + 1)}</p>
      </div>

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
        <img className="h-[15px] w-[15px]" src="/tries-icon.svg" alt="" />
        <b>{quiz.timesPlayed}</b>
      </div>
    </div>
  );
}
