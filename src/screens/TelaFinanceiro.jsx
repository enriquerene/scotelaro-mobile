import React, {useEffect, useState} from 'react';
import ItemNotificacao from "../components/ItemNotificacao";
import IconeComTitulo from "../components/IconeComTitulo";
import Icone from "../components/Icone";
import FiltroData from "../components/FiltroData";
import {useNotification} from "../services/pushNotification.context";


const mockNotificacoes = [
  {
    data: "2024-06-01 14:40",
    titulo: "Plano Total Pass",
    descricao: "Menslidade de Junho",
    tipo: "vencida",
    icone: {
      name: "error-circle",
      titulo: "Vencida",
      color: 'red'
    },
    detalhes: 'Quisque ut nisi. Quisque id odio. Etiam ultricies nisi vel augue.'
  },
  {
    data: "2024-06-01 14:40",
    titulo: "Plano Total Pass",
    descricao: "Menslidade de Junho",
    tipo: "aprovado",
    icone: {
      name: "check-circle",
      titulo: "Aprovado",
      color: 'green'
    }
  },
  {
    data: "2024-06-01 14:40",
    titulo: "Plano Total Pass",
    descricao: "Menslidade de Junho",
    tipo: "aprovado",
    icone: {
      name: "check-circle",
      titulo: "Aprovado",
      color: 'green'
    }
  },
  {
    data: "2024-06-01 14:40",
    titulo: "Plano Total Pass",
    descricao: "Menslidade de Junho",
    tipo: "aprovado",
    icone: {
      name: "check-circle",
      titulo: "Aprovado",
      color: 'green'
    }
  },
  {
    data: "2024-06-01 14:40",
    titulo: "Plano Total Pass",
    descricao: "Menslidade de Junho",
    tipo: "aprovado",
    icone: {
      name: "check-circle",
      titulo: "Aprovado",
      color: 'green'
    }
  },
  {
    data: "2024-06-01 14:40",
    titulo: "Plano Total Pass",
    descricao: "Menslidade de Junho",
    tipo: "aprovado",
    icone: {
      name: "check-circle",
      titulo: "Aprovado",
      color: 'green'
    }
  },
  {
    data: "2024-06-01 14:40",
    titulo: "Plano Total Pass",
    descricao: "Menslidade de Junho",
    tipo: "aprovado",
    icone: {
      name: "check-circle",
      titulo: "Aprovado",
      color: 'green'
    }
  },
  {
    data: "2024-06-01 14:40",
    titulo: "Plano Total Pass",
    descricao: "Menslidade de Junho",
    tipo: "aprovado",
    icone: {
      name: "check-circle",
      titulo: "Aprovado",
      color: 'green'
    }
  },
  {
    data: "2024-06-01 14:40",
    titulo: "Plano Total Pass",
    descricao: "Menslidade de Junho",
    tipo: "aprovado",
    icone: {
      name: "check-circle",
      titulo: "Aprovado",
      color: 'green'
    }
  },
  {
    data: "2024-06-01 14:40",
    titulo: "Plano Total Pass",
    descricao: "Menslidade de Junho",
    tipo: "vencida",
    icone: {
      name: "error-circle",
      titulo: "Vencida",
      color: 'red'
    },
    detalhes: 'Quisque ut nisi. Quisque id odio. Etiam ultricies nisi vel augue.'
  },
  {
    data: "2024-06-01 14:40",
    titulo: "Plano Total Pass",
    descricao: "Menslidade de Junho",
    tipo: "aprovado",
    icone: {
      name: "check-circle",
      titulo: "Aprovado",
      color: 'green'
    }
  },
  {
    data: "2024-06-01 14:40",
    titulo: "Plano Total Pass",
    descricao: "Menslidade de Junho",
    tipo: "vencida",
    icone: {
      name: "error-circle",
      titulo: "Vencida",
      color: 'red'
    },
    detalhes: 'Quisque ut nisi. Quisque id odio. Etiam ultricies nisi vel augue.'
  },
  {
    data: "2024-06-01 14:40",
    titulo: "Plano Total Pass",
    descricao: "Menslidade de Junho",
    tipo: "aprovado",
    icone: {
      name: "check-circle",
      titulo: "Aprovado",
      color: 'green'
    }
  },
  {
    data: "2024-06-01 14:40",
    titulo: "Plano Total Pass",
    descricao: "Menslidade de Junho",
    tipo: "vencida",
    icone: {
      name: "error-circle",
      titulo: "Vencida",
      color: 'red'
    },
    detalhes: 'Quisque ut nisi. Quisque id odio. Etiam ultricies nisi vel augue.'
  },
];

const CardFinanceiro = () => {
  return (
    <div className="border border-2 border-black m-3 p-1 d-flex justify-content-center flex-column align-items-center">
      <div className="border border-2 border-black bg-white text-center" style={{marginTop: -15, width: 115}}>
        <small>PLANO MENSAL</small>
      </div>
      <div className="py-3" style={{width: '95%'}}>
        <h3 className="m-0">
          Plano Muay Thai e MMA
          <br/><span className="text-primary" style={{fontSize: 20}}>R$ 200,00</span>
        </h3>
        <div className="d-flex my-3">
          <Icone name="qrcode" size={42} color="grey"/>
          <div className="d-flex flex-column justify-content-center">
            <button className="bg-white border border-0 m-0 p-0 text-left text-green"
                    style={{fontSize: 16, width: 102}}><strong>Pagar via PIX</strong></button>
            <small><span className="text-muted">Válido até</span> <strong>10/08/2024</strong></small>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <button className="bg-white border border-0 m-0 p-0 text-primary d-flex align-items-center">
            <Icone name="docs" size={20} color="primary"/>
            <strong className="px-1 pt-1">Ver contrato</strong>
          </button>
          <button className="bg-white border border-0 m-0 p-0 text-danger d-flex align-items-center">
            <Icone name="docs" size={20} color="danger"/>
            <strong className="px-1 pt-1">Cancelar plano</strong>
          </button>
        </div>
      </div>
    </div>
  );
}

const ListaDeNotificacoes = ({lista, reset}) => {
  if (lista.length > 0) {
    return lista.map(notificacao => (
      <ItemNotificacao
        data={notificacao.data}
        titulo={notificacao.titulo}
        descricao={notificacao.descricao}
        tipo={notificacao.tipo}
        detalhes={notificacao.detalhes}
        icone={<IconeComTitulo name={notificacao.icone.name} titulo={notificacao.icone.titulo}
                               color={notificacao.icone.color} size={32}/>}
      />
    ));
  }
  return (
    <div className="d-flex flex-column justify-content-center align-items-center p-3">
      <h3>Sem Notificações</h3>
      <p className="text-center mt-0">Não há notificações para o período de data incial e final informados.</p>
      <button onClick={reset} className="btn btn-danger text-white">Limpar Filtros</button>
    </div>
  );
}

const TelaFinanceiro = () => {
  const [notificacoes, setNotificacoes] = useState([]);
  const [dataInicial, setDataInicial] = useState(null);
  const [dataFinal, setDataFinal] = useState(null);
  const [notificacoesFiltradas, setNotificacoesFiltradas] = useState([]);
  const {notificar} = useNotification();

  const reset = () => {
    setDataFinal(null);
    setDataInicial(null);
  }

  useEffect(() => {
    if (dataInicial && dataFinal) {
      if (new Date(dataFinal) <= new Date(dataInicial)) {
        reset();
        notificar({
          mensagem: 'A data final não pode ser anterior a data inicial',
          tipo: 'erro'
        });
      }
    }
  }, [notificar, dataInicial, dataFinal]);

  useEffect(() => {
    const comFiltro = notificacoes
      .filter(n => {
        if (dataInicial) {
          const data = new Date(n.data);
          return data >= new Date(dataInicial);
        }
        return true;
      })
      .filter(n => {
        if (dataFinal) {
          const data = new Date(n.data);
          return data <= new Date(dataFinal);
        }
        return true;
      });
    setNotificacoesFiltradas(comFiltro);
  }, [dataInicial, dataFinal, setNotificacoesFiltradas, notificacoes]);

  useEffect(() => {
    setNotificacoes(mockNotificacoes);
  }, []);

  return (
    <>
      <CardFinanceiro/>
      <div className="d-flex flex-row align-items-center justify-content-evenly my-3">
        <FiltroData titulo="Data inicial" valorAtual={dataInicial} onChange={setDataInicial}/>
        <FiltroData titulo="Data final" valorAtual={dataFinal} onChange={setDataFinal}/>
      </div>
      <div className="scrollable-container financeiro-scroll">
        <ListaDeNotificacoes lista={notificacoesFiltradas} reset={reset}/>
      </div>
      <div style={{marginBottom: 200}}>&nbsp;</div>
    </>
  )
};

export default TelaFinanceiro;