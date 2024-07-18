import React from 'react';
import { Link } from "react-router-dom";
import {useUserStore} from "../services/userStore.context";
// import Icone from "./Icone";

const BarraDeNavegacao = ({iconeAtivo}) => {
  const tamanhoIcone = 28;
  // const icones = ['calendario', 'financeiro', 'perfil', 'turmas', 'mensagens'];
  const icones = ['financeiro', 'turmas'];
  const corPrimariaTema = '#F3AE42';
  // py-1 no ul

  const {logout} = useUserStore();

  return(
    <ul className="bg-black d-flex flex-row align-items-center justify-content-evenly py-4 position-fixed bottom-0 w-100">
      {icones.map((icone, index) => (
        <li key={index}>
          <Link to={icone}>
            <strong className={`text-${iconeAtivo === icone ? 'primary' : 'white'}`}>{icone.toUpperCase()}</strong>
            {/*<Icone name={icone} size={tamanhoIcone} color={iconeAtivo === icone ? corPrimariaTema : 'white'} />*/}
          </Link>
        </li>
      ))}
      <li onClick={logout}>
        <strong className="text-white">LOGOUT</strong>
      </li>
    </ul>
  );
}

export default BarraDeNavegacao;