import React, {useState} from 'react';
import {Link} from "react-router-dom";
import CampoSenha from "../components/CampoSenha";
import CampoTelefone from "../components/CampoTelefone";
import Botao from "../components/Botao";
import Switcher from "../components/Switcher";
import Backend from "../services/backend.service";

const LoginForm = ({sucesso, falha}) => {
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [lembrar, setLembrar] = useState(false);

  const enviaForm = async () => {
    const dados = {whatsapp: telefone.replace(/\D/g,''), senha}
    try {
      const res = await Backend.login(dados);
      if (Backend.STATUS.BEM_SUCEDIDO(res.status.code)) {
        sucesso(res.data, lembrar);
      } else {
        falha(res.data);
      }
    } catch (e) {
      falha({message: 'Falha de conexão com o servidor. Tente novamente mais tarde.'});
    }
  }

  return(
    <form onSubmit={(ev) => { ev.preventDefault() }} className="d-flex flex-column justify-content-center px-2 p-3">
      <CampoTelefone onSuccess={setTelefone} />
      <CampoSenha onSuccess={setSenha} />
      <div className="my-4">
        <Switcher texto="Manter meu login ativo." checked={lembrar} onChange={setLembrar} />
      </div>
      <Botao onClick={enviaForm}>Login</Botao>
      <Link className="text-white text-decoration-none text-center my-5" to="/cadastro">Não tenho login ainda</Link>
    </form>
  )
}

export default LoginForm;