import React from 'react';
import { MiniCardEvento } from './MiniCardEvento';
import { View } from 'tamagui';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MiniCardEvento> = {
  title: 'Modules/MiniCardEvento',
  component: MiniCardEvento,
  parameters: {
    controls: {
      expanded: true,
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Title of the event'
    },
    date: {
      control: 'text',
      description: 'Date of the event (e.g., "22/08")'
    },
    time: {
      control: 'text',
      description: 'Time of the event (e.g., "14:00")'
    },
    address: {
      control: 'text',
      description: 'Address where the event takes place'
    },
    onPress: { action: 'pressed' },
    testID: {
      control: 'text',
      description: 'Test ID for testing purposes'
    }
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
type Story = StoryObj<typeof MiniCardEvento>;

export const Default: Story = {
  args: {
    title: 'Workshop de Yoga',
    date: '22/08',
    time: '14:00',
    address: 'Rua das Flores, 123 - Centro',
    testID: 'mini-card-evento'
  },
};

export const LongTitle: Story = {
  args: {
    title: 'Seminário Internacional de Nutrição Esportiva e Suplementação',
    date: '15/09',
    time: '09:30',
    address: 'Av. Paulista, 1500 - Bela Vista',
    testID: 'mini-card-evento-long-title'
  },
};

export const LongAddress: Story = {
  args: {
    title: 'Treino Funcional',
    date: '30/08',
    time: '18:00',
    address: 'Centro Esportivo Água Rasa, Av. dos Esportes, 789, Bloco B, Sala 42 - Água Rasa',
    testID: 'mini-card-evento-long-address'
  },
};

// Using View as decorator directly in the story
export const MultipleCards: StoryObj = {
  render: () => (
    <View flexDirection="row" gap="$space.xl" flexWrap="wrap">
      <MiniCardEvento 
        title="Workshop de Yoga"
        date="22/08"
        time="14:00"
        address="Rua das Flores, 123 - Centro"
      />
      <MiniCardEvento 
        title="Treino Funcional"
        date="30/08"
        time="18:00"
        address="Centro Esportivo Água Rasa"
      />
      <MiniCardEvento 
        title="Palestra Saúde"
        date="05/09"
        time="19:30"
        address="Auditório Principal"
      />
    </View>
  ),
  parameters: {
    controls: { disable: true }, // Disable controls for this story as it's just a demo
  },
};