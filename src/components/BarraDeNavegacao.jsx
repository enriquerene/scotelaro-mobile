import React from 'react';
import { Link } from "react-router-dom";
import Icone from "./Icone";

const BarraDeNavegacao = ({iconeAtivo}) => {
  const tamanhoIcone = 28;
  const icones = ['calendario', 'financeiro', 'perfil', 'turmas', 'mensagens'];
  const corPrimariaTema = '#F3AE42';
  return(
    <ul className="bg-black d-flex flex-row align-items-center justify-content-evenly py-1 position-fixed bottom-0 w-100">
      {icones.map((icone, index) => (
        <li key={index}>
          <Link to={icone}>
            <Icone name={icone} size={tamanhoIcone} color={iconeAtivo === icone ? corPrimariaTema : 'white'} />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default BarraDeNavegacao;