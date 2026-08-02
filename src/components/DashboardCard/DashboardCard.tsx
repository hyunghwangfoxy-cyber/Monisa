import "./DashboardCard.css";

interface DashboardCardProps {

  icon: string;

  title: string;

  subtitle: string;

}


function DashboardCard({

  icon,

  title,

  subtitle

}: DashboardCardProps) {


  return (

    <div className="dashboardCard">

      <div className="cardIcon">
        {icon}
      </div>


      <h2>
        {title}
      </h2>


      <p>
        {subtitle}
      </p>


    </div>

  );

}


export default DashboardCard;