import React from "react";
import TemplateCredenciais from "../components/TemplateCredenciais";
import FormLogin from "../features/LoginForm";
import {useNavigate} from "react-router-dom";
import {useNotification} from "../services/pushNotification.context";

const TelaLogin = () => {
  const navigate = useNavigate();
  const { notificar } = useNotification();

  const sucesso = (dados) => {
    notificar({
      mensagem: 'Login realizado com sucesso',
      tipo: 'sucesso'
    });
    navigate('/app/');
  }
  return(
    <div className="bg-black">
      <TemplateCredenciais>
        <FormLogin sucesso={sucesso} />
      </TemplateCredenciais>
    </div>
  )
}

export default TelaLogin;