import React from 'react';
import { MiniCardTurma } from './MiniCardTurma';
import { View } from 'tamagui';
import type { Meta, StoryObj } from '@storybook/react';

// Define the image sources for easier selection
const imageSources = {
  muayThai: {uri: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000'},
  yoga: {uri: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1000'},
  spinning: {uri: 'https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=1000'},
};

const meta: Meta<typeof MiniCardTurma> = {
  title: 'Modules/MiniCardTurma',
  component: MiniCardTurma,
  parameters: {
    controls: {
      expanded: true,
    },
  },
  argTypes: {
    image: {
      control: 'select',
      options: Object.keys(imageSources),
      mapping: imageSources,
      description: 'Background image source'
    },
    title: {
      control: 'text',
      description: 'Title of the class'
    },
    time: {
      control: 'text',
      description: 'Time of the class'
    },
    days: {
      control: 'text',
      description: 'Days when the class occurs'
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
type Story = StoryObj<typeof MiniCardTurma>;

export const Default: Story = {
  args: {
    image: { uri: imageSources.muayThai },
    title: 'Muay Thai',
    time: '7:00',
    days: 'Seg Qua Sex',
    testID: 'mini-card-turma'
  },
};

export const WithLocalImage: Story = {
  args: {
    image: require('../../../assets/images/eu.png'),
    title: 'Jiu-Jitsu',
    time: '18:30',
    days: 'Ter Qui',
    testID: 'mini-card-turma-local'
  },
};

// Using View as decorator directly in the story
export const MultipleCards: StoryObj = {
  render: () => (
    <View flexDirection="row" gap="$space.xl" flexWrap="wrap">
      <MiniCardTurma 
        image={{ uri: imageSources.muayThai }}
        title="Muay Thai" 
        time="7:00" 
        days="Seg Qua Sex" 
      />
      <MiniCardTurma 
        image={{ uri: imageSources.yoga }}
        title="Yoga" 
        time="9:30" 
        days="Ter Qui Sáb" 
      />
      <MiniCardTurma 
        image={{ uri: imageSources.spinning }}
        title="Spinning" 
        time="19:00" 
        days="Seg Ter Qua" 
      />
    </View>
  ),
  parameters: {
    controls: { disable: true }, // Disable controls for this story as it's just a demo
  },
};
