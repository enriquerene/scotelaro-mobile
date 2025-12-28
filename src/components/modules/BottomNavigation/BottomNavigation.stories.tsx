import React from 'react';
import {Meta, StoryObj} from '@storybook/react';
import BottomNavigation from './BottomNavigation';
import BottomNavigationItem from '../BottomNavigationItem';
import {View} from 'tamagui';

const navigationNames = {
  financeiro: 'financeiro',
  agenda: 'agenda',
  turmas: 'turmas',
  eventos: 'eventos',
  perfil: 'perfil',
};

const meta: Meta<typeof BottomNavigation> = {
  title: 'Modules/BottomNavigation',
  component: BottomNavigation,
  argTypes: {
    items: {
      control: 'object',
    },
  },
  decorators: [
    (Story) => (
      <View style={{padding: 16, backgroundColor: '#000'}}>
        <Story/>
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof BottomNavigation>;

export const Default: Story = {
  args: {
    items: Object.keys(navigationNames).map((name, index) => (
      <BottomNavigationItem
        key={name}
        name={name}
        active={index === 0}
      />
    )),
  },
};