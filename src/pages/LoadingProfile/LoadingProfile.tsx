import "./LoadingProfile.css";
import logo from "../../assets/images/MONISA.png";
import { useEffect } from "react";


function LoadingProfile() {


  useEffect(() => {

    const timer = setTimeout(() => {

      window.location.href="/home";

    },4000);


    return () => clearTimeout(timer);


  },[]);



  return (

    <div className="loadingPage">


      <div className="loadingCard">


        <img

          src={logo}

          className="loadingLogo"

          alt="Logo Monisa"

        />



        <h1>
          Criando sua experiência 💙
        </h1>



        <p>
          A Monisa está preparando um ambiente personalizado para você.
        </p>



        <div className="loadingBar">

          <div className="loadingProgress"></div>

        </div>




        <div className="steps">


          <span>
            🧠 Analisando seu perfil
          </span>


          <span>
            🎨 Personalizando sua interface
          </span>


          <span>
            📚 Organizando conteúdos
          </span>


          <span>
            ✨ Quase tudo pronto...
          </span>



        </div>



      </div>


    </div>

  );


}


export default LoadingProfile;
