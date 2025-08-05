import React, { useState , useEffect } from "react";
import UseGetUserById from "../../hooks/user/UseGetUserById.jsx";
function CardUser({ user, idx , heights, colorsPosition , positions }) {
  const [dataUser , setDataUser] = useState({});
  const [visible, setVisible] = useState(false);

  const { getUserById } = UseGetUserById();
  
   
   useEffect(() => {
    
   async function fetchGetUserById(id) {
    const response = await getUserById({ id });
    if(response.ok) {
    setDataUser(response.data.user);
    setVisible(true);

    }
    
  
   }
  
   fetchGetUserById(user.userId);
  
   } , [user.userId])


  return (
     <div className="flex items-center justify-center gap-4 p-0 md:p-6 relative transition-all duration-500 ease-out">
     <img
        className={`${heights[idx]}  shadow-md rounded-[50%]`}
        src="/user-photo-icon.webp"
        alt="User icon"
      />
    
    <div
  className={`flex flex-col absolute items-center justify-center bottom-0 font-bold
    transition-all duration-500 ease-out
    ${visible ? 'opacity-100 translate-y-2 md:translate-y-0' : 'opacity-0 translate-y-6'}`}
>
  <p
    className={`flex items-center justify-center h-[35px] w-[35px] text-center rounded-[50%] ${colorsPosition[idx]}`}
  >
    {positions[idx]}
  </p>
  <p className="translate-y-2 text-black">{dataUser?.username}</p>
</div>



  
  </div>
  );
}


export default CardUser;





