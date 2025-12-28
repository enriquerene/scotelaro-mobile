import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Base/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: 'A versatile button component with multiple variants and sizes. Built with Tamagui for consistent theming and responsive design.',
      },
    },
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['solid', 'outline'],
      description: 'Visual style variant of the button',
      table: {
        defaultValue: { summary: 'solid' },
      },
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
      description: 'Color theme of the button',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'Size of the button',
      table: {
        defaultValue: { summary: 'medium' },
      },
    },
    disabled: { 
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    children: {
      description: 'Button content/text',
    },
  },
  args: {
    children: 'Button',
  },
}

export default meta

type Story = StoryObj<typeof Button>

export const PrimarySolid: Story = {
  args: {
    variant: 'solid',
    color: 'primary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Primary button with solid background.',
      },
    },
  },
}

export const PrimaryOutline: Story = {
  args: {
    variant: 'outline',
    color: 'primary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Primary button with outline style.',
      },
    },
  },
}

export const SecondarySolid: Story = {
  args: {
    variant: 'solid',
    color: 'secondary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Secondary button with solid background.',
      },
    },
  },
}

export const SecondaryOutline: Story = {
  args: {
    variant: 'outline',
    color: 'secondary',
  },
  parameters: {
    docs: {
      description: {
        story: 'Secondary button with outline style.',
      },
    },
  },
}

export const Small: Story = {
  args: {
    size: 'small',
  },
}

export const Large: Story = {
  args: {
    size: 'large',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}
