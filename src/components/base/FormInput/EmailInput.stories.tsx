import type { Meta, StoryObj } from '@storybook/react-native'
import { EmailInput } from './EmailInput'

const meta: Meta<typeof EmailInput> = {
  title: 'Base/EmailInput',
  component: EmailInput,
  argTypes: {
    allowSubdomains: { control: 'boolean' },
    error: { control: 'text' },
  },
  args: {
    label: 'Email',
    placeholder: 'Enter your email address',
  },
}

export default meta

type Story = StoryObj<typeof EmailInput>

export const Default: Story = {
  args: {},
}

export const WorkEmail: Story = {
  args: {
    label: 'Work Email',
    placeholder: 'Enter your work email',
  },
}

export const PersonalEmail: Story = {
  args: {
    label: 'Personal Email',
    placeholder: 'Enter your personal email',
  },
}

export const WithSubdomains: Story = {
  args: {
    allowSubdomains: true,
    label: 'Email (Subdomains Allowed)',
    placeholder: 'user@mail.example.com',
  },
}

export const WithoutSubdomains: Story = {
  args: {
    allowSubdomains: false,
    label: 'Email (No Subdomains)',
    placeholder: 'user@example.com',
  },
}

export const WithError: Story = {
  args: {
    error: 'Please enter a valid email address',
    label: 'Email',
  },
}

export const Newsletter: Story = {
  args: {
    label: 'Newsletter Email',
    placeholder: 'Subscribe to our newsletter',
  },
}

export const ContactEmail: Story = {
  args: {
    label: 'Contact Email',
    placeholder: 'How can we reach you?',
  },
}
