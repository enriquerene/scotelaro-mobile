import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import { Checkbox } from './Checkbox'

const meta: Meta<typeof Checkbox> = {
  title: 'Base/Checkbox',
  component: Checkbox,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    disabled: { control: 'boolean' },
  },
  args: {
    label: 'Accept terms and conditions',
    checked: false,
    disabled: false,
    size: 'medium',
  },
  render: function Render(args) {
    const [checked, setChecked] = useState(args.checked)
    return (
      <Checkbox 
        {...args} 
        checked={checked} 
        onChange={setChecked} 
      />
    )
  },
}

export default meta

type Story = StoryObj<typeof Checkbox>

export const Default: Story = {
  args: {
    label: 'I agree to the terms',
  },
}

export const Checked: Story = {
  args: {
    label: 'Subscribe to newsletter',
    checked: true,
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled checkbox',
    disabled: true,
  },
}

export const Small: Story = {
  args: {
    label: 'Small checkbox',
    size: 'small',
  },
}

export const Medium: Story = {
  args: {
    label: 'Medium checkbox',
    size: 'medium',
  },
}

export const Large: Story = {
  args: {
    label: 'Large checkbox',
    size: 'large',
  },
}

export const WithoutLabel: Story = {
  args: {
    label: '',
  },
}
