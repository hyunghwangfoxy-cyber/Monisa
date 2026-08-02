import "./Home.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import AIChat from "../../components/AIChat/AIChat";
import { useState } from "react";
import { Menu } from "lucide-react";


function Home(){

const [openSidebar,setOpenSidebar] = useState(true);


return(

<div className="home">


<Sidebar open={openSidebar}/>



<main className={`mainContent ${!openSidebar ? "full" : ""}`}>


<button

className="menuButton"

onClick={() => setOpenSidebar(!openSidebar)}

>

<Menu size={28}/>

</button>



<AIChat />


</main>


</div>

);

}


export default Home;