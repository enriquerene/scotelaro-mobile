import React, {useState} from 'react';
import {Link} from "react-router-dom";
import CampoNome from "../components/CampoNome";
import CampoSenha from "../components/CampoSenha";
import CampoTelefone from "../components/CampoTelefone";
import Botao from "../components/Botao";
import Backend from "../services/backend.service";

const FormCadastro = ({sucesso, falha}) => {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");

  const [senha, setSenha] = useState("");
  const enviaForm = async () => {
    const dados = {nome, whatsapp: telefone.replace(/\D/g,''), senha}
    const res = await Backend.registrar(dados);
    if (Backend.STATUS.BEM_SUCEDIDO(res.status.code)) {
      sucesso(res.data);
    } else {
      falha(res.data);
    }
  }

  return(
    <form onSubmit={(ev) => { ev.preventDefault() }} className="d-flex flex-column justify-content-center px-2 p-3">
      <CampoNome onSuccess={setNome} />
      <CampoTelefone onSuccess={setTelefone} />
      <CampoSenha onSuccess={setSenha} />
      <div className="mb-4"></div>
      <Botao onClick={enviaForm}>Cadastrar</Botao>
      <Link className="text-white text-decoration-none text-center my-5" to="/login">Já tenho uma conta</Link>
    </form>
  )
}

export default FormCadastro;