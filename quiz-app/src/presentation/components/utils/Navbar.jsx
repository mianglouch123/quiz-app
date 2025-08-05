import React from "react";
import { icons_array } from "../mocks/icons.navbar.js";

export default function Navbar() {

return (

<section className="navbar-screen flex-col items-center justify-center shadow-md sticky">
<ul className="flex flex-items-center justify-center gap-12">
{

icons_array.map((item , idx) => (
<a href={item.url} className=" border border-gray-100 focus:outline-none  rounded-[50%] py-4 px-4" key={idx}><img className="h-[18px] md:h-[20px]" src={item.path} alt={item.name} /></a>

))
}

</ul>


</section>

)

}