import {Meta, StoryObj} from "@storybook/react";
import UserFlowScreen from "./UserFlowScreen";
import {View} from "tamagui";
import ScreenContainer from "../../modules/ScreenContainer";
import HomeScreen from "../../../screens/main/HomeScreen";
import {Turma, Plano, Evento} from "../../../models";
import TurmasScreen from "../../../screens/main/TurmasScreen";
import AgendaScreen from "../../../screens/main/AgendaScreen";

const meta: Meta<typeof UserFlowScreen> = {
  title: 'Templates/UserFlowScreen',
  component: UserFlowScreen,
  decorators: [
    (Story) => (
      <View
        width={380}
        height={680}
        padding={8}
        backgroundColor="$gray3"
      >
        <Story />
      </View>
    )
  ]
}
export default meta;

const modalidades = {
  muayThai: {
    id: 1,
    nome: 'Muay Thai',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000',
  },
  boxe: {
    id: 2,
    nome: 'Boxe',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1000',
  },
  lutaLivre: {
    id: 3,
    nome: 'Luta Livre',
    image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=1000',
  },
}

const turmas: Turma[] = [
  {
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000',
    title: 'Muay Thai',
    horario: '14:00',
    dias: 'Seg Qua Sex',
    id: 1,
    modalidade: modalidades.muayThai,
  },
  {
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1000',
    title: 'Boxe',
    horario: '16:00',
    dias: 'Ter Qui',
    id: 2,
    modalidade: modalidades.boxe,
  },
  {
    image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=1000',
    title: 'Luta Livre',
    horario: '18:00',
    dias: 'Seg Ter Qua',
    id: 3,
    modalidade: modalidades.lutaLivre,
  },
  {
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1000',
    title: 'Boxe',
    horario: '16:00',
    dias: 'Ter Qui',
    id: 4,
    modalidade: modalidades.boxe,
  },
  {
    image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=1000',
    title: 'Luta Livre',
    horario: '18:00',
    dias: 'Seg Ter Qua',
    id: 5,
    modalidade: modalidades.lutaLivre,
  },
  {
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1000',
    title: 'Boxe',
    horario: '16:00',
    dias: 'Ter Qui',
    id: 6,
    modalidade: modalidades.boxe,
  },
  {
    image: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=1000',
    title: 'Luta Livre',
    horario: '18:00',
    dias: 'Seg Ter Qua',
    id: 7,
    modalidade: modalidades.lutaLivre,
  },
];
const plano: Plano = {
  nome: 'Plano Premium',
  valor: 'R$ 200,00',
  dataVencimento: '05/10',
  pendencias: 0
};
const eventos: Evento[] = [
  {
    id: 1,
    title: 'Campeonato de Muay Thai',
    date: '15/10',
    time: '09:00',
    address: 'Rua Principal, 123'
  },
  {
    id: 2,
    title: 'Workshop de Boxe',
    date: '22/10',
    time: '14:00',
    address: 'Av. Central, 456'
  }
];
const alertClicked = () => {
  alert('Link clicked!');
}


type Story = StoryObj<typeof UserFlowScreen>;
export const HomeScreenStory: Story = {
  args: {
    children: <ScreenContainer>
      <HomeScreen
        turmas={turmas}
        eventos={eventos}
        plano={plano}
        onEventosLinkPress={alertClicked}
        onTurmasLinkPress={alertClicked}
      />
    </ScreenContainer>
  },
  parameters: {
    docs: {
      description: {
        story: 'O fluxo que o usuário experimenta após fazer login com sucesso.'
      }
    }
  }
};

export const TurmasScreenStory: Story = {
  args: {
    children: <ScreenContainer>
      <TurmasScreen turmas={turmas} />
    </ScreenContainer>
  },
  parameters: {
    description: {
      story: 'A tela onde o usuário logado pode ver uma lista de turmas'
    }
  }
};

export const PerfilScreenStory: Story = {
  args: {
    children: <ScreenContainer></ScreenContainer>
  },
  parameters: {
    description: {
      story: 'A tela onde o usuário pode ver e editar suas informações pessoais',
      docs: {
        description: {
          story: 'A tela onde o usuário pode visualizar e editar suas informações pessoais'
        }
      }
    }
  }
}

export const FinanceiroScreenStory: Story = {
  args: {
    children: <ScreenContainer></ScreenContainer>
  },
  parameters: {
    description: {
      story: 'A tela onde o usuário pode ver seu histórico financeiro e mensalidades',
      docs: {
        description: {
          story: 'A tela onde o usuário pode visualizar seu histórico financeiro e mensalidades'
        }
      }
    }
  }
}

export const AgendaScreenStory: Story = {
  args: {
    children: <ScreenContainer>
      <AgendaScreen eventos={eventos} />
    </ScreenContainer>
  },
  parameters: {
    description: {
      story: 'A tela onde o usuário pode ver seus eventos e compromissos agendados',
      docs: {
        description: {
          story: 'A tela onde o usuário pode visualizar seus eventos e compromissos agendados'
        }
      }
    }
  }
}