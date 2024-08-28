import React, {useEffect, useState} from 'react';
import CardTurma from "../components/CardTurma";
import FiltroSelect from "../components/FiltroSelect";
import BackendService from "../services/backend.service";
import {useNotification} from "../services/pushNotification.context";
import {useUserStore} from "../services/userStore.context";

const SemTurmasDisponiveis = ({reset}) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center p-3">
      <h3>Sem Turmas disponíveis</h3>
      <p className="text-center mt-0">Não há disponibilidade de turmas para os filtros de Modalidade e Horários selecionados.</p>
      <button onClick={reset} className="btn btn-danger text-white">Limpar Filtros</button>
    </div>
  );
}

const ListaDeTurmas = ({lista, reset, inscricaoNaTurma, planoAtual}) => {
  if (lista.length > 0) {
    return lista
        .sort(turma => {
          if (planoAtual) {
            if (planoAtual.turmas.find(t => t.id === turma.id)) {
              return -1;
            }
          }
          return 1;
        })
        .map((turma) => {
      const inscrito = planoAtual ? planoAtual.turmas.find(t => t.id === turma.id) : false;
      return (
          <div className="mt-3" key={turma.id}>
            <CardTurma
                modalidade={turma.modalidade.nome}
                descricao={turma.modalidade.descricao}
                valor={turma.valor}
                horarios={turma.horarios}
                nome={turma.nome}
                manipuladorInscricao={inscricaoNaTurma(turma)}
                inscrito={inscrito}
            />
          </div>
      );
    });
  }
  return <SemTurmasDisponiveis reset={reset}/>
}

const TelaTurmas = ({acaoInscricao, acaoExperimental}) => {
  const [turmas, setTurmas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [modalidadeEscolhida, setModalidadeEscolhida] = React.useState({id: 0, texto: 'Todas'});
  const [horarioEscolhido, setHorarioEscolhido] = React.useState({id: 0, texto: 'Todos'});
  const [turmasFiltradas, setTurmasFiltradas] = React.useState([]);

  const {credenciais} = useUserStore();
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
    if (horaInicial >= '12:00:00' && horaInicial < '17:00:00') {
      return 'tarde';
    }
    if (horaInicial >= '17:00:00') {
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
            return turma.modalidade.nome.toLowerCase() === modalidadeEscolhida.texto.toLowerCase()
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
          notificar({mensagem: 'Falha de conexão com o servidor. Não foi possível carregar turmas disponíveis.', tipo: 'erro'});
        }
      } catch (e) {
        notificar({mensagem: 'Falha de conexão com o servidor. Não foi possível carregar turmas disponíveis.', tipo: 'erro'});
      } finally {
        setCarregando(false);
      }
    }
    turmasDoServidor();
  }, []);

  const inscricaoEmTurma = (turma) => {
    return (permanentemente) => {
      if (permanentemente) {
        notificar({
          mensagem: `É necessário se increver em um plano vinculado a turma ${turma.nome}.`,
          tipo: 'info'
        });
        acaoInscricao();
      } else {
        notificar({
          mensagem: `O professor responsável será notificado do seu interesse na turma ${turma.nome}.`,
          tipo: 'info'
        });
        acaoExperimental(turma.nome);
      }
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
        <ListaDeTurmas lista={turmasFiltradas} reset={reset} inscricaoNaTurma={inscricaoEmTurma} planoAtual={credenciais ? credenciais.plano : null} />
      </div>
    </>
  );
}

export default TelaTurmas;