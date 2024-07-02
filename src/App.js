import './index.css';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from 'react-router-dom';
import TelaLogin from './screens/TelaLogin';
import TelaCadastro from "./screens/TelaCadastro";
import Frame from "./components/Frame";
import {useState} from "react";
import PushNotification from "./components/PushNotification";
import { PushNotificationProvider } from "./services/pushNotification.context";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <PushNotificationProvider>
      <PushNotification />
      <Router>
        <Routes>
          <Route path="/login" element={<TelaLogin/>}/>
          <Route path="/cadastro" element={<TelaCadastro/>}/>
          <Route path="/app/*" element={<Frame isAuthenticated={isAuthenticated}/>}/>
          <Route path="*" element={<Navigate to={isAuthenticated ? "/app/home" : "/login"}/>}/>
        </Routes>
      </Router>
    </PushNotificationProvider>
  );
}

export default App;
