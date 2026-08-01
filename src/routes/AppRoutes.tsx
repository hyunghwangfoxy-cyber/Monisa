import { Routes, Route } from "react-router-dom";
import Welcome from "../pages/Welcome/Welcome";
import Splash from "../pages/Splash/Splash";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";


export default function AppRoutes(){

  return (
    <Routes>


   <Route path="/" element={<Splash />} />

<Route path="/welcome" element={<Welcome />} />

<Route path="/login" element={<Login />} />

<Route path="/register" element={<Register />} 
/>
      

    </Routes>
  );

}