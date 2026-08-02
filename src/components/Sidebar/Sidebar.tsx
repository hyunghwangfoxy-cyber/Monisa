import "./Sidebar.css";
import logo from "../../assets/images/monisa.png";


interface Props{
  open:boolean;
}


function Sidebar({open}:Props){


function handleLogout(){

  window.location.href="/login";

}



return(

<aside className={`sidebar ${open ? "show" : "hide"}`}>


<img
src={logo}
className="sidebarLogo"
alt="Monisa"
/>


<h2>
MONISA
</h2>



<nav>


<button>
🏠 Início
</button>


<button>
📚 Meus Estudos
</button>


<button>
📈 Progresso
</button>


<button>
🏆 Conquistas
</button>


<button>
♿ Acessibilidade
</button>


<button>
🎨 Personalizar
</button>


<button>
👤 Meu Espaço
</button>



</nav>



<button 
className="logoutButton"
onClick={handleLogout}
>

🚪 Sair

</button>



</aside>


);


}


export default Sidebar;