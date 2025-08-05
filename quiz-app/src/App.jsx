import Card from "./presentation/components/global-components/Card.jsx"


function App() {
   

  return (

<main className="main-screen-primary">
 <section className="flex flex-col gap-4 justify-start items-start"> 
  <h2 className="text-4xl font-semibold text-blue-600">Let's play</h2> 
  <h2 className="text-1xl font-semibold text-gray-500 text-2xl">Be the first</h2>

 </section> 
 
<div className="flex flex-col items-center justify-center gap-12 md:gap-16 py-4 mt-4 w-full">

<Card background="bg-gradient-to-r from-pink-400 to-orange-400" 
level={"1"} text={"Explore quizzes"} href={"/quizzes"}  />
<Card path={"/hot-air-balloon.png"} background="bg-gradient-to-r from-blue-700 to-blue-400" level={"2"} text={"Create a Quiz"}  href={"/create-quiz"}/>
<Card path={"camera.png"} background="bg-gradient-to-r from-purple-300 to-pink-300" level={"3"} text={"My Attemps"} href={"/my-attemps"}  />

</div>


</main>
  
  )
}

export default App
