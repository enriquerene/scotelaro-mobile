import React, {useEffect, useState} from 'react';
import CardTurma from "../components/CardTurma";
import FiltroSelect from "../components/FiltroSelect";
import BackendService from "../services/backend.service";
import {useNotification} from "../services/pushNotification.context";

const SemTurmasDisponiveis = ({reset}) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center p-3">
      <h3>Sem Turmas disponíveis</h3>
      <p className="text-center mt-0">Não há disponibilidade de turmas para os filtros de Modalidade e Horários selecionados.</p>
      <button onClick={reset} className="btn btn-danger text-white">Limpar Filtros</button>
    </div>
  );
}

const ListaDeTurmas = ({lista, reset, inscricaoNaTurma}) => {
  if (lista.length > 0) {
    return lista.map((turma) => (
      <div className="mt-3" key={turma.id}>
        <CardTurma
          modalidade={turma.modalidade.nome}
          descricao={turma.modalidade.descricao}
          valor={turma.valor}
          horarios={turma.horarios}
          nome={turma.nome}
          manipuladorInscricao={inscricaoNaTurma(turma)}
        />
      </div>
    ));
  }
  return <SemTurmasDisponiveis reset={reset}/>
}

const TelaTurmas = () => {
  const [turmas, setTurmas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [modalidadeEscolhida, setModalidadeEscolhida] = React.useState({id: 0, texto: 'Todas'});
  const [horarioEscolhido, setHorarioEscolhido] = React.useState({id: 0, texto: 'Todos'});
  const [turmasFiltradas, setTurmasFiltradas] = React.useState([]);

  const {notificar} = useNotification();

  const opcoesDeModalidades = [
    {
      id: 0,
      texto: 'Todas',
    },
    {
      id: 2,
      texto: 'Luta Livre',
    },
    {
      id: 1,
      texto: 'Muay Thai',
    },
    {
      id: 3,
      texto: 'Boxe',
    },
    {
      id: 4,
      texto: 'MMA',
    },
  ];
  const opcoesDeHorarios = [
    {
      id: 0,
      texto: 'Todos',
    },
    {
      id: 1,
      texto: 'Manhã',
      slug: 'manha',
    },
    {
      id: 3,
      texto: 'Noite',
      slug: 'noite',
    },
  ];

  const obtemTurnoDoHorario = (horaInicial) => {
    if (horaInicial < '12:00:00') {
      return 'manha';
    }
    if (horaInicial >= '12:00:00' && horaInicial < '17:30:00') {
      return 'tarde';
    }
    if (horaInicial >= '17:30:00') {
      return 'noite';
    }
  }
  const reset = () => {
    setModalidadeEscolhida({id: 0, texto: 'Todas'});
    setHorarioEscolhido({id: 0, texto: 'Todos'});
  }
  const filtraPorModalidade = (opcao) => {
    setModalidadeEscolhida(opcao);
  }
  const filtraPorHorario = (opcao) => {
    setHorarioEscolhido(opcao);
  }
  useEffect(() => {
    const comFiltros = turmas
      .filter(turma => {
        if (modalidadeEscolhida.id !== 0) {
          return turma.modalidade.id === modalidadeEscolhida.id
        }
        return true;
      })
      .filter(turma => {
        if (horarioEscolhido.id !== 0) {
          return turma.horarios.find(horario => obtemTurnoDoHorario(horario.hora_inicio) === horarioEscolhido.slug)
        }
        return true;
      });
    setTurmasFiltradas(comFiltros);

  }, [turmas, modalidadeEscolhida, horarioEscolhido]);
  useEffect(() => {
    const turmasDoServidor = async () => {
      try {
        const r = await BackendService.obterListaDeTurmas();
        if (BackendService.STATUS.BEM_SUCEDIDO(r.status.code)) {
          setTurmas(r.data);
        } else {
          console.log(r);
          // notificar('Falha de conexão com o servidor. Não foi possível carregar turmas disponíveis.', 'erro');
        }
      } catch (e) {
        console.log(e);
        // notificar('Falha de conexão com o servidor. Não foi possível carregar turmas disponíveis.', 'erro');
      } finally {
        setCarregando(false);
      }
    }
    turmasDoServidor();
  }, []);

  const inscricaoEmTurma = (turma) => {
    return (permanentemente) => {
      console.log('turma escolhida:', turma);
      console.log('inscricao permanete: ', permanentemente);
    }
  }

  if (carregando) {
    return (
      <div>carregando...</div>
    );
  }
  return (
    <>
      <div className="d-flex flex-row align-items-center justify-content-evenly">
        <FiltroSelect onChange={filtraPorModalidade} titulo="Modalidade" opcoes={opcoesDeModalidades} opcaoAtual={modalidadeEscolhida} />
        <FiltroSelect onChange={filtraPorHorario} titulo="Horários" opcoes={opcoesDeHorarios} opcaoAtual={horarioEscolhido} />
      </div>
      <div className="px-2 mt-3 scrollable-container turmas-scroll">
        <ListaDeTurmas lista={turmasFiltradas} reset={reset} inscricaoNaTurma={inscricaoEmTurma} />
      </div>
    </>
  );
}

export default TelaTurmas;