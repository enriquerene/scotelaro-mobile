import type { Meta, StoryObj } from '@storybook/react-native'
import { Link } from './Link'

const meta: Meta<typeof Link> = {
  title: 'Base/Link',
  component: Link,
  argTypes: {
    onPress: { action: 'pressed' },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
    },
    underline: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: {
    label: 'Click me',
    variant: 'primary',
    underline: false,
    disabled: false,
  },
}

export default meta

type Story = StoryObj<typeof Link>

export const Primary: Story = {
  args: {
    label: 'Primary Link',
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    label: 'Secondary Link',
    variant: 'secondary',
  },
}

export const WithUnderline: Story = {
  args: {
    label: 'Underlined Link',
    underline: true,
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Link',
    disabled: true,
  },
}

export const LongText: Story = {
  args: {
    label: 'This is a very long link that might wrap to multiple lines if the container is not wide enough',
  },
}
