import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import LabeledIcon from './LabeledIcon';
import { View, Circle, Square, Text } from 'tamagui';
import {User, HandCoins, Users, MessageSquareText} from '@tamagui/lucide-icons'

const iconsSource = {
  user: <User />,
  hand: <HandCoins />,
  group: <Users />,
  message: <MessageSquareText />,
}

const meta: Meta<typeof LabeledIcon> = {
  title: 'Base/LabeledIcon',
  component: LabeledIcon,
  argTypes: {
    icon: {
      control: 'select',
      options: Object.keys(iconsSource),
      mapping: iconsSource
    },
    label: { control: 'text' },
  },
  decorators: [
    (Story) => (
        <View style={{ padding: 16, backgroundColor: '#f5f5f5' }}>
        <Story />
      </View>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof LabeledIcon>;

export const Default: Story = {
  args: {
    icon: <Circle size="$h1" backgroundColor="$primary" />,
    label: 'Home',
    color: '$primary',
  },
};

export const SquareIcon: Story = {
  args: {
    icon: <Square size="$h1" backgroundColor="black" />,
    label: 'Profile',
    color: 'black'
  },
};