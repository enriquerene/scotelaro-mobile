import './index.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate
} from 'react-router-dom';
import TelaLogin from './screens/TelaLogin';
import TelaCadastro from "./screens/TelaCadastro";
import Frame from "./components/Frame";
import PushNotification from "./components/PushNotification";
import {PushNotificationProvider} from "./services/pushNotification.context";
import {UserStoreProvider, useUserStore} from "./services/userStore.context";
import {useEffect, useState} from "react";
import BackendService from "./services/backend.service";
import Logo from "./components/Logo";

const FrameOrLogin = () => {
  const navigate = useNavigate();
  const {credenciais, loginPermanente} = useUserStore();
  useEffect(() => {
    if (!credenciais) {
      navigate("/login");
    } else {
      navigate("/app/");
    }
  }, [credenciais, navigate]);

  return null;
}

function App() {
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [turmas, setTurmas] = useState([]);

  useEffect(() => {
    const turmasDoServidor = async () => {
      try {
        const r = await BackendService.obterListaDeTurmas();
        if (BackendService.STATUS.BEM_SUCEDIDO(r.status.code)) {
          setTurmas(r.data);
        }
      } catch (e) {
        console.error('Exception!');
        setErro(e.message);
      } finally {
        setCarregando(false);
      }
    }
    turmasDoServidor();
  }, []);

  return (
    <UserStoreProvider>
      <PushNotificationProvider>
        <PushNotification/>
        <Router>
          <Routes>
            <Route path="/login" element={<TelaLogin/>}/>
            <Route path="/cadastro" element={<TelaCadastro/>}/>
            <Route path="/app/*" element={<Frame turmasDisponiveis={turmas}/>}/>
            <Route path="/*" element={<FrameOrLogin/>}/>
          </Routes>
        </Router>
      </PushNotificationProvider>
    </UserStoreProvider>
  );
}

export default App;
