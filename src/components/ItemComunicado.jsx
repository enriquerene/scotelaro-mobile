import React, {useState} from 'react';
import Icone from "./Icone";

const ItemNotificacao = ({data, titulo, descricao, icone, tipo, detalhes}) => {
  const [open, setOpen] = useState(false);

  const d = new Date(data);
  const obtemDiaDaSemana = () => {
    const dias = {
      0: 'Domingo',
      1: 'Segunda',
      2: 'Terça',
      3: 'Quarta',
      4: 'Quinta',
      5: 'Sexta',
      6: 'Sábado'
    };
    return dias[d.getDay()];
  }
  const obtemHorario = () => {
    const hora = d.getHours();
    const min = d.getMinutes();
    return `${hora}:${min}`;
  }

  const Toggler = () => {
    const nomeDoIcone = open ? 'minimizar' : 'expandir';
    return (
      <div className="d-flex justify-content-center align-items-center">
        <Icone name={nomeDoIcone} size={30} color="#000"/>
      </div>
    );
  }
  const IconeEToggler = () => {
    if (icone) {
      return (
        <>
          <div className="item-notificacao-icone d-flex justify-content-center align-items-center">{icone}</div>
          <Toggler/>
        </>
      );
    }
    return <Toggler/>;
  }

  const Detalhes = () => {
    if (detalhes) {
      return <p className="px-4">{detalhes}</p>
    }
    return <p className="text-center">sem detalhes adicionais</p>
  }

  const obtemCores = () => {
    const mapaTipoCor = {
      'aprovado': {bg: 'paid', border: 'success'},
      'aprovada': {bg: 'paid', border: 'success'},
      'pendente': {bg: 'pending', border: 'warning'},
      'vencido': {bg: 'overdue', border: 'danger'},
      'vencida': {bg: 'overdue', border: 'danger'},
      'default': {bg: 'white', border: 'gray'},
    };
    return mapaTipoCor[tipo] ?? mapaTipoCor['default'];
  }

  const cores = obtemCores();
  return (
    <div
      onClick={() => {
        setOpen(!open);
      }}
      className={`item-notificacao bg-${cores.bg} border-bottom border-2 border-${cores.border}`}
    >
      <div className="d-flex flex-row item-notificacao-topo">
        <div className="item-notificacao-data d-flex flex-column align-items-center py-1 px-2">
          <strong className="dia-do-mes">{d.getDay()}</strong>
          <span className="dia-da-semana">{obtemDiaDaSemana()}</span>
          <span className="horario">{obtemHorario()}</span>
        </div>
        <div className="item-notificacao-centro d-flex flex-column justify-content-around flex-grow-1 px-3 py-1">
          <h4 className="my-0 titulo">{titulo}</h4>
          <p className="my-0 descricao text-muted">{descricao}</p>
        </div>
        <IconeEToggler/>
      </div>
      <div className={`item-notificacao-expansao text-muted ${open ? 'aberto' : ''}`}>
        <Detalhes />
      </div>
    </div>

  )
};

export default ItemNotificacao;