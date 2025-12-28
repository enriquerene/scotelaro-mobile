import React from 'react';
import {Meta, StoryObj} from '@storybook/react';
import BottomNavigationItem from './BottomNavigationItem';
import {View} from 'tamagui';

const navigationNames = {
  financeiro: 'financeiro',
  agenda: 'agenda',
  turmas: 'turmas',
  eventos: 'eventos',
  perfil: 'perfil',
};

const meta: Meta<typeof BottomNavigationItem> = {
  title: 'Modules/BottomNavigationItem',
  component: BottomNavigationItem,
  argTypes: {
    name: {
      control: 'select',
      options: Object.keys(navigationNames),
      mapping: navigationNames
    },
    active: {control: 'boolean'},
  },
  decorators: [
    (Story) => (
      <View style={{padding: 16, backgroundColor: '#1e1e1e'}}>
        <Story/>
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof BottomNavigationItem>;

export const Default: Story = {
  args: {
    name: 'financeiro',
    active: false,
  },
};

export const Active: Story = {
  args: {
    name: 'agenda',
    active: true,
  },
};