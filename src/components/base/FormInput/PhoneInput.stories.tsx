import type { Meta, StoryObj } from '@storybook/react-native'
import { PhoneInput } from './PhoneInput'

const meta: Meta<typeof PhoneInput> = {
  title: 'Base/PhoneInput',
  component: PhoneInput,
  argTypes: {
    format: {
      control: { type: 'select' },
      options: ['us', 'international', 'none'],
    },
    countryCode: { control: 'text' },
    error: { control: 'text' },
  },
  args: {
    label: 'Phone Number',
    placeholder: 'Enter your phone number',
  },
}

export default meta

type Story = StoryObj<typeof PhoneInput>

export const Default: Story = {
  args: {},
}

export const USFormat: Story = {
  args: {
    format: 'us',
    label: 'US Phone Number',
    placeholder: '(555) 123-4567',
  },
}

export const InternationalFormat: Story = {
  args: {
    format: 'international',
    label: 'International Phone',
    placeholder: '+1 555 123 4567',
  },
}

export const NoFormat: Story = {
  args: {
    format: 'none',
    label: 'Phone (No Formatting)',
    placeholder: '5551234567',
  },
}

export const MobileNumber: Story = {
  args: {
    label: 'Mobile Number',
    placeholder: 'Enter your mobile number',
    format: 'us',
  },
}

export const WorkPhone: Story = {
  args: {
    label: 'Work Phone',
    placeholder: 'Enter your work phone',
    format: 'us',
  },
}

export const EmergencyContact: Story = {
  args: {
    label: 'Emergency Contact',
    placeholder: 'Emergency contact number',
    format: 'us',
  },
}

export const WithError: Story = {
  args: {
    error: 'Please enter a valid phone number',
    label: 'Phone Number',
    format: 'us',
  },
}

export const CustomCountryCode: Story = {
  args: {
    countryCode: '+44',
    format: 'international',
    label: 'UK Phone Number',
    placeholder: '+44 20 7946 0958',
  },
}
