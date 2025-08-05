import React from "react";
import { mockCategories } from "../mocks/categories.js";


function CategoriesCreateQuiz({ selectedCategory , setSelectedCategory }) {

return (

<section className="flex flex mt-6 items-center justify-start gap-4 border border-white h-[75px] w-[90%] gap-4 px-4">

<div className="py px-4 rounded-sm py-2 bg-white text-black font-semibold">3</div>
<p className="text-white">Select catogory: </p>

<select className="bg-white text-[#1e59e6] font-semibold rounded-sm outline-none p-2 pl-2 pr-2" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
{mockCategories.map((category) => (
<option key={category._id} > {category.categoryName} </option>

))}
</select>

</section>

)

}

export default CategoriesCreateQuiz





