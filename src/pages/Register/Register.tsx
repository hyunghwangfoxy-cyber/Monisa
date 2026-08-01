import "./Register.css";
import logo from "../../assets/images/monisa.png";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase";


function Register() {


  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");



  const handleRegister = async () => {

    try {


      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );


      alert("Conta criada com sucesso! 💙");


      window.location.href="/quiz";


    } catch(error) {


      alert("Erro ao criar conta. Verifique seus dados.");


    }

  };



  return (

    <div className="registerPage">


      <div className="registerCard">


        <img
          src={logo}
          className="registerLogo"
          alt="Logo Monisa"
        />


        <h1>
          Crie sua conta
        </h1>


        <p className="registerSubtitle">
          Vamos criar uma experiência feita para você.
        </p>



        <div className="registerInput">

          <User size={20}/>

          <input
            type="text"
            placeholder="Digite seu nome"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />

        </div>




        <div className="registerInput">

          <Mail size={20}/>

          <input
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

        </div>




        <div className="registerInput">

          <Lock size={20}/>

          <input

            type={showPassword ? "text" : "password"}

            placeholder="Crie uma senha"

            value={password}

            onChange={(e)=>setPassword(e.target.value)}

          />



          {
            showPassword ?

            <EyeOff

              size={20}

              className="registerEye"

              onClick={()=>setShowPassword(false)}

            />

            :

            <Eye

              size={20}

              className="registerEye"

              onClick={()=>setShowPassword(true)}

            />

          }


        </div>




        <button 
          className="registerButton"
          onClick={handleRegister}
        >

          Criar conta

        </button>




        <p className="registerLoginText">

          Já possui uma conta?


          <span onClick={()=>window.location.href="/login"}>

            Entrar

          </span>


        </p>



      </div>


    </div>

  );

}


export default Register;