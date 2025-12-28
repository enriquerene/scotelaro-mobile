import type { Meta, StoryObj } from '@storybook/react-native'
import { Heading } from './Heading'

const meta: Meta<typeof Heading> = {
  title: 'Base/Heading',
  component: Heading,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    align: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
    },
  },
  args: {
    title: 'Section Title',
    size: 'medium',
    align: 'left',
  },
}

export default meta

type Story = StoryObj<typeof Heading>

export const Default: Story = {
  args: {
    title: 'Default Heading',
  },
}

export const Small: Story = {
  args: {
    title: 'Small Heading',
    size: 'small',
  },
}

export const Large: Story = {
  args: {
    title: 'Large Heading',
    size: 'large',
  },
}

export const Centered: Story = {
  args: {
    title: 'Centered Heading',
    align: 'center',
  },
}

export const RightAligned: Story = {
  args: {
    title: 'Right Aligned',
    align: 'right',
  },
}

export const WithCustomColor: Story = {
  args: {
    title: 'Colored Heading',
    color: '$primary',
  },
}
