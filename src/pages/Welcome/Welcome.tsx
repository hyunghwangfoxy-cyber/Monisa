import "./Welcome.css";
import logo from "../../assets/images/monisa.png";


function Welcome() {


  return (

    <div className="welcomePage">


      <div className="welcomeCard">


        <img
          src={logo}
          className="welcomeLogo"
          alt="Logo Monisa"
        />


        <h1>
          Olá, seja bem-vindo(a)! 💙
        </h1>


        <p>
          Uma plataforma criada para você aprender
          do seu jeito, com uma experiência
          personalizada e acessível.
        </p>



        <button
          className="startButton"
          onClick={() => window.location.href="/register"}
        >
          Começar
        </button>



        <button
          className="accountButton"
          onClick={() => window.location.href="/login"}
        >
          Já tenho uma conta
        </button>


      </div>


    </div>

  );

}


export default Welcome;