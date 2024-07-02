import React from 'react';
import {Link} from "react-router-dom";
import CampoSenha from "../components/CampoSenha";
import CampoTelefone from "../components/CampoTelefone";
import Botao from "../components/Botao";
import Switcher from "../components/Switcher";

const LoginForm = () => {
  return(
    <form className="d-flex flex-column justify-content-center px-2 p-3">
      <CampoTelefone/>
      <CampoSenha/>
      <div className="my-4">
        <Switcher />
      </div>
      <Botao>Login</Botao>
      <Link className="text-white text-decoration-none text-center my-5" to="/cadastro">Não tenho login ainda</Link>
    </form>
  )
}

export default LoginForm;