import React from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { mockCategories } from "../mocks/categories.js";


function OptionsCategories() {

const location = useLocation();
const navigate = useNavigate();


function handleCategory(category) {

const params = new URLSearchParams(location.search);
const current = params.get("Category");

 if(current && current.trim().toLowerCase() === category.trim().toLowerCase()) {
  params.delete("Category"); 
}
else {
 params.set("Category" , category.toString().toLowerCase());
}


navigate({ search: params.toString() }, { replace: true });


}


return (

<div className="flex items-center justify-center gap-4">

<ul className=" flex items-center gap-4 
    md:justify-center 
    overflow-x-auto md:overflow-x-visible
    px-2  whitespace-nowrap

">
{

mockCategories.length > 0 && mockCategories.map((category) => (
<li className="button-category-search cursor-pointer" onClick={() => handleCategory(category.categoryName)} key={category._id}>{ category.categoryName }</li>
))

}

</ul>

</div>

)


}

export default OptionsCategories