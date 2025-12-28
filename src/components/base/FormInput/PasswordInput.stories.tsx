import type { Meta, StoryObj } from '@storybook/react-native'
import { PasswordInput } from './PasswordInput'

const meta: Meta<typeof PasswordInput> = {
  title: 'Base/PasswordInput',
  component: PasswordInput,
  argTypes: {
    minLength: { control: { type: 'number', min: 4, max: 20 } },
    requireSpecialChar: { control: 'boolean' },
    requireNumber: { control: 'boolean' },
    requireUppercase: { control: 'boolean' },
    error: { control: 'text' },
  },
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
  },
}

export default meta

type Story = StoryObj<typeof PasswordInput>

export const Default: Story = {
  args: {},
}

export const WithMinLength: Story = {
  args: {
    minLength: 12,
    label: 'Strong Password',
    placeholder: 'Enter at least 12 characters',
  },
}

export const WithSpecialCharRequirement: Story = {
  args: {
    requireSpecialChar: true,
    label: 'Password with Special Character',
    placeholder: 'Must include special character (!@#$%^&*)',
  },
}

export const WithNumberRequirement: Story = {
  args: {
    requireNumber: true,
    label: 'Password with Number',
    placeholder: 'Must include at least one number',
  },
}

export const WithUppercaseRequirement: Story = {
  args: {
    requireUppercase: true,
    label: 'Password with Uppercase',
    placeholder: 'Must include uppercase letter',
  },
}

export const StrongPassword: Story = {
  args: {
    minLength: 10,
    requireSpecialChar: true,
    requireNumber: true,
    requireUppercase: true,
    label: 'Strong Password',
    placeholder: 'Must be 10+ chars with special, number, uppercase',
  },
}

export const WithError: Story = {
  args: {
    error: 'Password is too weak',
    label: 'Password',
  },
}

export const ConfirmPassword: Story = {
  args: {
    label: 'Confirm Password',
    placeholder: 'Re-enter your password',
  },
}
