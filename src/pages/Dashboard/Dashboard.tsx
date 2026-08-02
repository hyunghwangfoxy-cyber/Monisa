import "./Dashboard.css";
import DashboardCard from "../../components/DashboardCard/DashboardCard";


function Dashboard(){

return(

<div className="dashboardGrid">


<DashboardCard

icon="📚"

title="Continuar estudando"

subtitle="Continue exatamente de onde parou."

/>



<DashboardCard

icon="🤖"

title="IA Monisa"

subtitle="Aprenda com uma experiência personalizada."

/>



<DashboardCard

icon="🎯"

title="Meta diária"

subtitle="Acompanhe seus objetivos."

/>



<DashboardCard

icon="📈"

title="Progresso"

subtitle="Veja sua evolução."

/>



<DashboardCard

icon="🏆"

title="Conquistas"

subtitle="Suas medalhas e resultados."

/>



<DashboardCard

icon="♿"

title="Acessibilidade"

subtitle="Personalize sua experiência."

/>


</div>

);

}


export default Dashboard;