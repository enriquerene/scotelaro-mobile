import React from "react";
import TemplateCredenciais from "../components/TemplateCredenciais";
import FormCadastro from "../features/CadastroForm";
import {useNavigate} from "react-router-dom";
import {useNotification} from "../services/pushNotification.context";

const TelaCadastro = () => {
  const navigate = useNavigate();
  const { notificar } = useNotification();
  const sucessoCadastro = () => {
    notificar({
      mensagem: 'Cadastro realizado com sucesso',
      tipo: 'sucesso'
    });
    navigate('/login');
  }
  const erroCadastro = (dados) => {
    console.log(dados);
    notificar({
      mensagem: dados.message,
      tipo: 'erro'
    })
  }
  return(
    <div className="bg-black">
      <TemplateCredenciais>
        <FormCadastro sucesso={sucessoCadastro} falha={erroCadastro} />
      </TemplateCredenciais>
    </div>
  )
}

export default TelaCadastro;