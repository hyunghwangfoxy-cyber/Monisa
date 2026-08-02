import { Routes, Route } from "react-router-dom";
import Welcome from "../pages/Welcome/Welcome";
import Splash from "../pages/Splash/Splash";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Quiz from "../pages/Quiz/Quiz";
import LoadingProfile from "../pages/LoadingProfile/LoadingProfile";
import Home from "../pages/Home/Home";

export default function AppRoutes(){

  return (
 <Routes>

      <Route path="/" element={<Splash />} />

      <Route path="/welcome" element={<Welcome />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/quiz" element={<Quiz />} />

      <Route path="/loading" element={<LoadingProfile />} />

      <Route path="/home" element={<Home/>}/>
    </Routes>
  );

}