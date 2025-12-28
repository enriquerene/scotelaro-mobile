import React from 'react';
import { MiniCardHorario } from './MiniCardHorario';
import { View } from 'tamagui';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof MiniCardHorario> = {
  title: 'Modules/MiniCardHorario',
  component: MiniCardHorario,
  parameters: {
    controls: {
      expanded: true,
    },
  },
  argTypes: {
    horario: {
      control: 'text',
      description: 'Horário a ser exibido',
    },
    dias: {
      control: 'text',
      description: 'Dias da semana',
    },
    featured: {
      control: 'boolean',
      description: 'Quando true, aplica borda primária',
    },
    onPress: { action: 'pressed' },
    testID: {
      control: 'text',
      description: 'Test ID para testes',
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
type Story = StoryObj<typeof MiniCardHorario>;

export const Muted: Story = {
  args: {
    horario: '19:00',
    dias: 'Seg Qua Sex',
    featured: false,
    testID: 'mini-card-horario',
  },
};

export const Selected: Story = {
  args: {
    horario: '19:00',
    dias: 'Seg Qua Sex',
    featured: true,
    testID: 'mini-card-horario-selected',
  },
};

export const Showcase: StoryObj = {
  render: () => (
    <View flexDirection="row" gap="$space.xl" flexWrap="wrap">
      <MiniCardHorario horario="07:00" dias="Seg Qua Sex" />
      <MiniCardHorario horario="09:30" dias="Ter Qui Sáb" />
      <MiniCardHorario horario="19:00" dias="Seg Ter Qua" featured/>
    </View>
  ),
  parameters: {
    controls: { disable: true },
  },
};
