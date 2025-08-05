import '../index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from "../../src/App.jsx";
import LoginPage from '../presentation/pages/auth/Login.jsx'
import RegisterPage from "../presentation/pages/auth/Register.jsx"
import PrivateRoute from './PrivateRouter.jsx';
import CreateQuiz from '../presentation/pages/private/CreateQuiz.jsx'
import QuizzesPage from '../presentation/pages/public/QuizzesPage.jsx';
import TakeQuizById from '../presentation/pages/private/TakeQuizById.jsx';
import MyAttemps from '../presentation/pages/private/MyAttemps.jsx';
import MyFavoriteQuizzes from '../presentation/pages/private/MyFavoriteQuizzes.jsx';
import MYProfile from '../presentation/pages/private/MyProfile.jsx';
import UpdateQuiz from '../presentation/pages/private/UpdateQuiz.jsx';


const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
         
    <Route element={<PrivateRoute />}>
   
    <Route path="/" element={<App />} />
    <Route path="/create-quiz" element={<CreateQuiz />} />
    <Route path="/quizzes" element={<QuizzesPage />} />
    <Route path="/take-quiz/:quizId" element={<TakeQuizById />} />
    <Route path="/my-attemps" element={<MyAttemps />} />
    <Route path="/my-favorites" element={<MyFavoriteQuizzes />} />
    <Route path="/my-profile" element={<MYProfile />} />
    <Route path="/update-quiz/:quizId" element={<UpdateQuiz />} />


    </Route>
    
    </Routes>
    </Router>
  )
}

export default AppRouter


