import AppRoutes from "./routes/AppRoutes";
import MonisaProvider from './context/MonisaProvider';
import './styles/monisa.css';

function App() {
  return <MonisaProvider><AppRoutes /></MonisaProvider>;
}

export default App;
