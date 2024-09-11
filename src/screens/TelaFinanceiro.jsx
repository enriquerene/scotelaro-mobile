import React, {useEffect, useState} from 'react';
import ItemNotificacao from "../components/ItemNotificacao";
import IconeComTitulo from "../components/IconeComTitulo";
import Icone from "../components/Icone";
import FiltroData from "../components/FiltroData";
import {useNotification} from "../services/pushNotification.context";
import {useUserStore} from "../services/userStore.context";
import BackendService from '../services/backend.service';
import FiltroSelect from "../components/FiltroSelect";
import SelectDescritivo from "../components/SelectDescritivo";
import { contato as contatoWhatsApp } from "../services/whatsapp.service";


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
];

const CardPlanoVigente = ({plano, cancelarPlano}) => {
    return (
        <div
            className="border border-2 border-black m-3 p-1 d-flex justify-content-center flex-column align-items-center">
            <div className="border border-2 border-black bg-white text-center" style={{marginTop: -15, width: 115}}>
                <small>PLANO MENSAL</small>
            </div>
            <div className="py-3" style={{width: '95%'}}>
                <h3 className="m-0">
                    {plano.nome}
                    <br/><span className="text-primary" style={{fontSize: 20}}>{`R$ ${plano.valor},00`}</span>
                </h3>
                <div className="d-flex my-3">
                    <Icone name="qrcode" size={42} color="grey"/>
                    <div className="d-flex flex-column justify-content-center">
                        <a href={plano.link_pagamento} className="bg-white border border-0 m-0 p-0 text-left text-green"
                                style={{fontSize: 16, width: 148}}><strong>Pagar mensalidade</strong></a>
                        <small><span className="text-muted">Válido até</span> <strong>10/08/2024</strong></small>
                    </div>
                </div>
                <div className="d-flex justify-content-between">
                    <a href={plano.link_contrato} className="bg-white border border-0 m-0 p-0 text-primary d-flex align-items-center">
                        <Icone name="docs" size={20} color="primary"/>
                        <strong className="px-1 pt-1">Ver contrato</strong>
                    </a>
                    <button
                        className="bg-white border border-0 m-0 p-0 text-danger d-flex align-items-center"
                        onClick={cancelarPlano}
                    >
                        <Icone name="docs" size={20} color="danger"/>
                        <strong className="px-1 pt-1">Cancelar plano</strong>
                    </button>
                </div>
            </div>
        </div>
    );
}

const CardDetalhesPlano = ({plano, inscreverPlano}) => {
    if (plano) {
        return (
            <>
                <h3 className="mb-0">
                    {plano.texto}
                    <br/><span className="text-primary" style={{fontSize: 20}}>{`R$ ${plano.preco},00`}</span>
                </h3>
                <p className="text-muted mt-2">{plano.descricao}</p>
                <button onClick={() => {
                    inscreverPlano(plano)
                }} className="btn btn-block btn-primary text-white w-100">Inscrever-se
                </button>
            </>
        );
    }
    return <h3 className="mb-0">Selecione um plano</h3>;
}
const CardOpcoesDePlanos = ({opcoes, inscreverPlano}) => {
    const [opcaoAtual, setOpcaoAtual] = useState(null);
    const opcoesFormatadas = opcoes.map(o => ({id: o.id, texto: o.nome, descricao: o.descricao, preco: o.valor}));

    return (
        <div
            className="border border-2 border-black m-3 p-1 d-flex justify-content-center flex-column align-items-center">
            <div className="border border-2 border-black bg-white text-center" style={{marginTop: -15, width: 65}}>
                <small>PLANOS</small>
            </div>
            <div className="py-3" style={{width: '95%'}}>
                <FiltroSelect opcoes={opcoesFormatadas} onChange={setOpcaoAtual} opcaoAtual={opcaoAtual}
                              opcaoNula={{texto: 'Selecione um plano'}}/>
                <CardDetalhesPlano plano={opcaoAtual} inscreverPlano={inscreverPlano}/>
            </div>
        </div>
    );
}

const CardFinanceiro = ({plano, cancelarPlano, opcoes, inscreverPlano}) => {
    return (plano
            ? <CardPlanoVigente plano={plano} cancelarPlano={cancelarPlano}/>
            : <CardOpcoesDePlanos opcoes={opcoes} inscreverPlano={inscreverPlano}/>
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

const AvisoNaoExistenciaNotificacoes = () => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center p-3">
            <h3>Sem Notificações</h3>
            <p className="text-center mt-0">Você não possui notificações ainda.</p>
        </div>
    );
}

const AvisoOuListaDeNotificacoes = ({existemNotificacoes, reset, notificacoesFiltradas, dataInicial, setDataInicial, dataFinal, setDataFinal}) => {
    return (existemNotificacoes
        ? <>
            <div className="d-flex flex-row align-items-center justify-content-evenly my-3">
                <FiltroData titulo="Data inicial" valorAtual={dataInicial} onChange={setDataInicial}/>
                <FiltroData titulo="Data final" valorAtual={dataFinal} onChange={setDataFinal}/>
            </div>
            <div className="scrollable-container financeiro-scroll">
                <ListaDeNotificacoes lista={notificacoesFiltradas} reset={reset}/>
            </div>
        </>
        : <AvisoNaoExistenciaNotificacoes/>
    );
}

const TelaFinanceiro = ({planos}) => {
    const [notificacoes, setNotificacoes] = useState([]);
    const [dataInicial, setDataInicial] = useState(null);
    const [dataFinal, setDataFinal] = useState(null);
    const [notificacoesFiltradas, setNotificacoesFiltradas] = useState([]);
    const {notificar} = useNotification();
    const {credenciais, login, permaneceLogado} = useUserStore();

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

    // implementar notificações através dos dados de pagamentos
    // useEffect(() => {
    //     setNotificacoes(mockNotificacoes);
    // }, []);

    const cancelarPlano = async () => {
        window.location.href = `whatsapp://send?phone=${contatoWhatsApp}&text=Gostaria de cancelar meu plano atual.`;
        // try {
        //     const res = await BackendService.cancelarPlano(credenciais.token);
        //     if (BackendService.STATUS.BEM_SUCEDIDO(res.status.code)) {
        //         notificar({
        //             mensagem: 'Plano cancelado com sucesso.',
        //             tipo: 'sucesso'
        //         });
        //         login(res.data, permaneceLogado());
        //     } else {
        //         notificar({
        //             mensagem: 'Não foi possível cancelar plano por falha de conexão com servidor.',
        //             tipo: 'erro'
        //         });
        //     }
        // } catch (e) {
        //     notificar({
        //         mensagem: 'Não foi possível cancelar plano por falha inesperada da aplicação.',
        //         tipo: 'erro'
        //     });
        // }
    }

    const inscreverPlano = async (planoEscolhido) => {
        const p = planos.find(x => x.id === planoEscolhido.id);
        try {
            const res = await BackendService.inscreverEmPlano(p.id, credenciais.token);
            if (BackendService.STATUS.BEM_SUCEDIDO(res.status.code)) {
                notificar({
                    mensagem: `Parabéns, você está inscrito no plano ${p.nome}.`,
                    tipo: 'sucesso'
                });
                login(res.data, permaneceLogado());
            } else {
                notificar({
                    mensagem: `Falha inesperada ao se inscrever no plano ${p.nome}.`,
                    tipo: 'erro'
                });
            }
        } catch (e) {
            notificar({
                mensagem: `Falha inesperada ao se inscrever no plano ${p.nome}.`,
                tipo: 'erro'
            });
        }
    }

    return (
        <>
            <CardFinanceiro plano={credenciais ? credenciais.plano : null} cancelarPlano={cancelarPlano}
                            opcoes={planos} inscreverPlano={inscreverPlano} />
            <AvisoOuListaDeNotificacoes
                existemNotificacoes={notificacoes.length > 0}
                reset={reset}
                notificacoesFiltradas={notificacoesFiltradas}
                dataInicial={dataInicial}
                setDataInicial={setDataInicial}
                dataFinal={dataFinal}
                setDataFinal={setDataFinal}
            />
        </>
    )
};

export default TelaFinanceiro;