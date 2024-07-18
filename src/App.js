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
import {useEffect} from "react";

const FrameOrLogin = () => {
  const navigate = useNavigate();
  const { credenciais, loginPermanente } = useUserStore();
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
  return (
    <UserStoreProvider>
      <PushNotificationProvider>
        <PushNotification/>
        <Router>
          <Routes>
            <Route path="/login" element={<TelaLogin />}/>
            <Route path="/cadastro" element={<TelaCadastro />}/>
            <Route path="/app/*" element={<Frame />}/>
            <Route path="/*" element={<FrameOrLogin />}/>
          </Routes>
        </Router>
      </PushNotificationProvider>
    </UserStoreProvider>
  );
}

export default App;
