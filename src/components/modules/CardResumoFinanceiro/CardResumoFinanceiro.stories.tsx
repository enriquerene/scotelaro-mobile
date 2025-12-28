import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { CardResumoFinanceiro } from './CardResumoFinanceiro';
import { View } from 'react-native';

const meta: Meta<typeof CardResumoFinanceiro> = {
  title: 'Modules/CardResumoFinanceiro',
  component: CardResumoFinanceiro,
  argTypes: {
    nomeDoPlano: { control: 'text' },
    valorDoPlano: { control: 'text' },
    dataDeVencimento: { control: 'text' },
    numeroDePendencias: { control: 'number' },
    onPress: { action: 'pressed' },
  },
  decorators: [
    (Story) => (
      <View style={{ padding: 16, maxWidth: 500 }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CardResumoFinanceiro>;

export const Default: Story = {
  args: {
    nomeDoPlano: 'Combo 2 Turmas',
    valorDoPlano: 'R$ 200,00',
    dataDeVencimento: '14/07',
    numeroDePendencias: 2,
    testID: 'card-resumo-financeiro-default',
  },
};

// Current date + 15 days for safe scenario
const getFutureDueDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 15);
  return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}`;
};

export const SafePayment: Story = {
  args: {
    nomeDoPlano: 'Combo 3 Turmas',
    valorDoPlano: 'R$ 300,00',
    dataDeVencimento: getFutureDueDate(),
    numeroDePendencias: 0,
    testID: 'card-resumo-financeiro-safe',
  },
};

// Current date + 3 days for danger scenario
const getNearDueDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 3);
  return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}`;
};

export const NearExpiration: Story = {
  args: {
    nomeDoPlano: 'Combo 2 Turmas',
    valorDoPlano: 'R$ 200,00',
    dataDeVencimento: getNearDueDate(),
    numeroDePendencias: 1,
    testID: 'card-resumo-financeiro-near-expiration',
  },
};

export const WithoutPendencies: Story = {
  args: {
    nomeDoPlano: 'Combo 2 Turmas',
    valorDoPlano: 'R$ 200,00',
    dataDeVencimento: '14/07',
    numeroDePendencias: 0,
    testID: 'card-resumo-financeiro-no-pendencies',
  },
};

export const WithPressHandler: Story = {
  args: {
    ...Default.args,
    onPress: () => console.log('Card pressed'),
    testID: 'card-resumo-financeiro-clickable',
  },
};
