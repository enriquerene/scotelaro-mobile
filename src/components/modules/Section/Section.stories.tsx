import type { Meta, StoryObj } from '@storybook/react-native';
import { Section } from './Section';
import { Text, YStack } from 'tamagui';
import { styled } from 'tamagui';

const meta: Meta<typeof Section> = {
  title: 'Modules/Section',
  component: Section,
  argTypes: {
    title: { control: 'text' },
    linkLabel: { control: 'text' },
  },
  args: {
    title: 'Section Title',
    linkLabel: 'View All',
  },
};

export default meta;

type Story = StoryObj<typeof Section>;

const MockContent = () => (
  <YStack 
    padding="$4" 
    backgroundColor="$backgroundHover" 
    borderRadius="$4"
    space="$2"
  >
    <Text>This is some content inside the section.</Text>
    <Text>You can put any components here.</Text>
  </YStack>
);

export const Default: Story = {
  args: {
    children: <MockContent />,
  },
};

export const WithLink: Story = {
  args: {
    children: <MockContent />,
    onLinkPress: () => console.log('Link pressed'),
  },
};

export const WithoutLink: Story = {
  args: {
    children: <MockContent />,
    linkLabel: undefined,
    onLinkPress: undefined,
  },
};

export const CustomTitle: Story = {
  args: {
    title: 'Custom Section Title',
    children: <MockContent />,
    linkLabel: 'See More',
    onLinkPress: () => console.log('Custom link pressed'),
  },
};
