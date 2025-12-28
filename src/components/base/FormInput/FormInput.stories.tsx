import type { Meta, StoryObj } from '@storybook/react-native'
import { FormInput } from './FormInput'
import { useState } from 'react'

const meta: Meta<typeof FormInput> = {
  title: 'Base/FormInput',
  component: FormInput,
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['text', 'password', 'email', 'phone'],
    },
    error: { control: 'text' },
  },
  args: {
    label: 'Input Label',
    placeholder: 'Enter text here',
  },
}

export default meta

type Story = StoryObj<typeof FormInput>

export const Default: Story = {
  args: {
    type: 'text',
  },
}

export const Email: Story = {
  args: {
    type: 'email',
    label: 'Email',
    placeholder: 'Enter your email',
  },
}

export const Password: Story = {
  args: {
    type: 'password',
    label: 'Password',
    placeholder: 'Enter your password',
  },
}

export const WithError: Story = {
  args: {
    type: 'email',
    label: 'Email',
    error: 'Invalid email format',
  },
}

export const WithValidation: Story = {
  render: () => {
    const [value, setValue] = useState('')
    const validateEmail = (email: string) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return re.test(email)
    }

    return (
      <FormInput
        label="Email with validation"
        type="email"
        value={value}
        onChangeText={setValue}
        onValidate={validateEmail}
        placeholder="Enter a valid email"
      />
    )
  },
}
