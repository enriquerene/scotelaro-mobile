import type { Meta, StoryObj } from '@storybook/react-native'
import { Text } from './Text'

const meta: Meta<typeof Text> = {
  title: 'Base/Text',
  component: Text,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['h1', 'h2', 'body', 'caption'],
    },
    bold: { control: 'boolean' },
  },
  args: {
    children: 'Sample Text',
  },
}

export default meta

type Story = StoryObj<typeof Text>

export const Heading1: Story = {
  args: {
    variant: 'h1',
    children: 'Heading 1',
  },
}

export const Heading2: Story = {
  args: {
    variant: 'h2',
    children: 'Heading 2',
  },
}

export const Body: Story = {
  args: {
    variant: 'body',
    children: 'Body text',
  },
}

export const Caption: Story = {
  args: {
    variant: 'caption',
    children: 'Caption text',
  },
}

export const Bold: Story = {
  args: {
    bold: true,
    children: 'Bold text',
  },
}
