export default function Card( {...props } ) {

return (

<a href={props.href ?? "#"} className={`flex flex-col  justify-start py-4 
h-[180px] 
w-[90%] 
md:h-[206px]
md:w-[485px]
${props.background ?? "bg-gradient-to-r from-pink-400 to-orange-400"}
rounded-2xl shadow-md 
cursor-pointer relative
`}>

<img src={props?.path ?? "/stack-of-books.png"} className="absolute right-0 -top-[30px]  w-[95px] w-[45px]" alt="" />

<div className="ml-4 flex items-center justify-center h-[35px] w-[35px] border b-white items-center justify-center text-[#ffffff] rounded-sm">
<img src="/check-icon.svg" className="height-[25px] w-[25px]" alt="Card icon" />
</div>


<div className="flex px-6 gap-2 py-4 flex-col text-white font-semibold">
<h1>level {props?.level ?? ""}</h1>
<h2 className="text-2xl font-bold ml-4 ">  {props?.text ?? ""}  </h2>
</div>

</a>

)

}