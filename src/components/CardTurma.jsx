import React from "react";
import Icone from "./Icone";

const BotoesCasoInscrito = () => {
  return (
      <div className="botoes d-flex justify-content-evenly m-2">
        <button onClick={() => {}} className="btn btn-outline-dark w-100">Inscrito</button>
      </div>
  );
}

const BotoesCasoNaoInscrito = ({manipuladorInscricao}) => {
  return (
    <div className="botoes d-flex justify-content-evenly my-2">
      <button onClick={() => {
        manipuladorInscricao(false)
      }} className="btn btn-outline-primary">Aula experimental
      </button>
      <button onClick={() => {
        manipuladorInscricao(true)
      }} className="btn btn-primary text-white">Inscrever-se
      </button>
    </div>
  );
}

const BotoesDoCard = ({manipuladorInscricao, inscrito}) => {
  return (inscrito
    ? <BotoesCasoInscrito />
    : <BotoesCasoNaoInscrito manipuladorInscricao={manipuladorInscricao} />
  );
}

const CardTurma = ({inscrito, descricao, valor, horarios, modalidade, nome, manipuladorInscricao}) => {
  const nomeDoDiaAPartirDoNumero = (num) => {
    const dias = {
      '0': 'Domingo',
      '1': 'Segunda',
      '2': 'Terça',
      '3': 'Quarta',
      '4': 'Quinta',
      '5': 'Sexta',
      '6': 'Sábado'
    }
    return dias[`${num}`];
  }
  const formataHora = (hora) => {
    const partes = hora.split(':');
    return `${parseInt(partes[0])}:${partes[1]}`;
  }
  const formataPreco = (preco) => {
    return `R$ ${preco},00`;
  }
  const obtemDias = () => {
    return horarios
      .map(horario => nomeDoDiaAPartirDoNumero(horario.dia_semana).substring(0,3))
      .join(' ');
  }
  const obtemHorario = () => {
    const inicio = formataHora(horarios[0].hora_inicio);
    const fim = formataHora(horarios[0].hora_fim);
    return `${inicio} - ${fim}`;
  }

  return (
    <div className="card-turma shadow border rounded">
      <div className="imagem d-flex flex-row align-items-end justify-content-start bg-black p-2">
        <h3 className="mb-0 mt-5 text-white">{nome}</h3>
      </div>
      <div className="info d-flex my-2 p-2">
        <ul className="w-50">
          <li className="d-flex align-items-center">
            <Icone name="calendario" size={20} color="grey"/>
            <small className="text-muted mx-1">{obtemDias()}</small>
          </li>
          <li className="d-flex align-items-center">
            <Icone name="relogio" size={20} color="grey"/>
            <small className="text-muted my-3 mx-1">{obtemHorario()}</small>
          </li>
          <li className="d-flex align-items-center">
            <Icone name="financeiro" size={20} color="grey"/>
            <small className="text-muted mx-1">{formataPreco(valor)}</small>
          </li>
        </ul>
        <small className="w-50 m-0 text-muted">{descricao ?? modalidade.descricao}</small>
      </div>
      <BotoesDoCard manipuladorInscricao={manipuladorInscricao} inscrito={inscrito} />
    </div>
  );
}

export default CardTurma;