import "./Login.css";
import logo from "../../assets/images/MONISA.png";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebase";


function Login() {


  const [showPassword, setShowPassword] = useState(false);


  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");



  const handleLogin = async () => {


    try {


      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );


      alert("Login realizado com sucesso! 💙");


      window.location.href="/quiz";


    } catch(error) {


      alert("E-mail ou senha incorretos.");


    }


  };



  return (

    <div className="loginPage">


      <div className="loginCard">


        <img 
          src={logo}
          className="loginLogo"
          alt="Logo Monisa"
        />



        <h1>
          Bem-vindo(a)!
        </h1>



        <p className="subtitle">
          Entre para aprender do seu jeito.
        </p>




        <div className="inputBox">

          <Mail size={20}/>


          <input

            type="email"

            placeholder="Digite seu e-mail"

            value={email}

            onChange={(e)=>setEmail(e.target.value)}

          />


        </div>





        <div className="inputBox">


          <Lock size={20}/>


          <input

            type={showPassword ? "text" : "password"}

            placeholder="Digite sua senha"

            value={password}

            onChange={(e)=>setPassword(e.target.value)}

          />



          {
            showPassword ?

            <EyeOff

              size={20}

              className="eyeIcon"

              onClick={()=>setShowPassword(false)}

            />

            :

            <Eye

              size={20}

              className="eyeIcon"

              onClick={()=>setShowPassword(true)}

            />

          }


        </div>





        <button

          className="loginButton"

          onClick={handleLogin}

        >

          Entrar

        </button>





        <p className="registerText">

          Ainda não possui uma conta?


          <span 
            onClick={()=>window.location.href="/register"}
          >

            Criar conta

          </span>


        </p>



      </div>


    </div>

  );

}


export default Login;
