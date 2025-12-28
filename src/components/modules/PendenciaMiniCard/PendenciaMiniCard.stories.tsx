import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { View } from 'tamagui';
import { PendenciaMiniCard } from './PendenciaMiniCard';

const meta: Meta<typeof PendenciaMiniCard> = {
  title: 'Modules/PendenciaMiniCard',
  component: PendenciaMiniCard,
  parameters: {
    controls: {
      expanded: true,
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Título exibido no topo do card',
    },
    price: {
      control: { type: 'number', min: 0 },
      description: 'Preço (inteiro)',
    },
    paymentDate: {
      control: 'text',
      description: 'Data limite de pagamento (string)',
    },
    imageUrl: {
      control: 'text',
      description: 'URL da imagem do produto',
    },
  },
  decorators: [
    (Story: React.ComponentType) => (
      <View padding="$space.xl">
        <Story />
      </View>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof PendenciaMiniCard>;

export const Default: Story = {
  args: {
    title: 'Mensalidade de Outubro',
    price: 200,
    paymentDate: '05/11',
    imageUrl: 'https://placehold.co/400',
  },
};

export const WithAnotherImage: Story = {
  args: {
    title: 'Uniforme Escolar',
    price: 150,
    paymentDate: '20/10',
    imageUrl: 'https://placehold.co/300',
  },
};
