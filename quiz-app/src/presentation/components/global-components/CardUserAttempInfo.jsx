import React from "react";

function CardUserAttempInfo({ data }) {

return (

<div className="flex h-[70px] w-[90%] bg-white border border-gray-300 shadow-sm items-center justify-evenly px-4 gap-4 rounded-md" >

<section className="flex items-center justify-center ">

<img height={55} width={55} src="/user-photo-icon.webp" alt="" />

</section>

<div className="md:pl-4 font-bold">
<p> Score {data._id} </p>

</div>

<div className="  pt-2 pb-2  text-white font-bold">
<p className="text-black"> Played {new Date(data.playedAt).toLocaleDateString()}</p>
</div>


</div>

)

}


export default CardUserAttempInfo;