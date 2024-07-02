import React, {useEffect} from 'react';
import {
  Route,
  Routes,
  Navigate,
  Outlet,
  useLocation, useNavigate
} from 'react-router-dom';
import BarraDeNavegacao from "./BarraDeNavegacao";
import TelaFinanceiro from "../screens/TelaFinanceiro";

const Mock = ({nome}) => {
  const funcionalidadesDasTelas = {
    'calendario': ['ver dias e horários das turmas', 'verificar eventos especiais', 'lista de aulas particulares contratadas'],
    'financeiro': ['ver status de mensalidades anteriores', 'lembrete de pagamentos', 'pagamento via pix'],
    'perfil': ['dados pessoais', 'seus dados de atleta', 'ver plano contratado'],
    'turmas': ['lista de turmas disponíveis no CT', 'se inscrever em turmas'],
    'mensagens': ['ver notificações enviadas pelos professores e administradores do CT']
  }
  return (
    <div className=" px-2 py-4">
      <div className="text-center">
        <h2>Em desenvolvimento</h2>
        <p>Em breve estaremos atualizando o aplicativo para comportar esta funcionalidade.</p>
      </div>
      <h3 className="text-center mt-5">Funcionalidades esperadas:</h3>
      <ol>
        {funcionalidadesDasTelas[nome].map((funcionalidadesDaTela, index) => (
          <li key={index}>{funcionalidadesDaTela}</li>
        ))}
      </ol>
    </div>
  );
}

const Frame = ({isAuthenticated, children}) => {
  const location = useLocation();
  const iconeAtivo = location.pathname.replace('/app/', '');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <Routes>
        <Route path="calendario" element={<Mock nome="calendario"/>}/>
        <Route path="financeiro" element={<TelaFinanceiro />}/>
        <Route path="perfil" element={<Mock nome="perfil"/>}/>
        <Route path="turmas" element={<Mock nome="turmas"/>}/>
        <Route path="mensagens" element={<Mock nome="mensagens"/>}/>
        <Route path="*" element={<Navigate to="turmas"/>}/>
      </Routes>
      <BarraDeNavegacao iconeAtivo={iconeAtivo}/>
      <Outlet/>
    </div>
  );
}

export default Frame;