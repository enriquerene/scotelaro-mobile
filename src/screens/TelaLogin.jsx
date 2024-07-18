import React, {useEffect, useState} from "react";
import TemplateCredenciais from "../components/TemplateCredenciais";
import FormLogin from "../features/LoginForm";
import {useNavigate} from "react-router-dom";
import {useNotification} from "../services/pushNotification.context";
import {useUserStore} from "../services/userStore.context";

const TelaLogin = () => {
  const navigate = useNavigate();
  const { notificar } = useNotification();
  const { login, credenciais, permaneceLogado } = useUserStore();

  useEffect(() => {
    if (credenciais) {
      if (!permaneceLogado) {
        notificar({
          mensagem: 'Login realizado com sucesso',
          tipo: 'sucesso'
        });
      }
      navigate('/app/');
    }
  }, [credenciais, navigate, notificar]);

  const sucesso = (dados, lembrar = false) => {
    login(dados, lembrar);
  }
  const falha = (dados) => {
    notificar({
      mensagem: dados.message,
      tipo: 'erro'
    });
  }

  return(
    <div className="bg-black">
      <TemplateCredenciais>
        <FormLogin sucesso={sucesso} falha={falha} />
      </TemplateCredenciais>
    </div>
  )
}

export default TelaLogin;