import React from 'react';
import TituloDaTela from "../components/TituloDaTela";
import ItemNotificacao from "../components/ItemNotificacao";
import IconeComTitulo from "../components/IconeComTitulo";

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
]

const TelaFinanceiro = () => {
  return(
    <div>
      <TituloDaTela titulo="Financeiro" />
      {
        mockNotificacoes.map(notificacao => (
          <ItemNotificacao
            data={notificacao.data}
            titulo={notificacao.titulo}
            descricao={notificacao.descricao}
            tipo={notificacao.tipo}
            detalhes={notificacao.detalhes}
            icone={<IconeComTitulo name={notificacao.icone.name} titulo={notificacao.icone.titulo} color={notificacao.icone.color} size={32} />}
          />
        ))
      }
    </div>
  )
};

export default TelaFinanceiro;