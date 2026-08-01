import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Splash.css";
import logo from "../../assets/images/monisa.png";


function Splash() {

  const navigate = useNavigate();


  useEffect(() => {

    const timer = setTimeout(() => {

      navigate("/welcome");

    }, 2500);


    return () => clearTimeout(timer);

  }, [navigate]);



  return (

    <div className="splash">

      <motion.div
        className="logoBox"

        initial={{
          opacity: 0,
          scale: 0.5
        }}

        animate={{
          opacity: 1,
          scale: 1
        }}

        transition={{
          duration: 1
        }}
      >


        <img
          src={logo}
          className="logoImage"
          alt="Logo Monisa"
        />



        <p>
          Aprenda do seu jeito!
        </p>


      </motion.div>


    </div>

  );

}


export default Splash;