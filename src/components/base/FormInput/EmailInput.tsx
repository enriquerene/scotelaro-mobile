import React from 'react'
import { FormInput } from './FormInput'

export type EmailInputProps = Omit<React.ComponentProps<typeof FormInput>, 'type'> & {
  label?: string
  allowSubdomains?: boolean
}

const validateEmail = (email: string, allowSubdomains = true): boolean => {
  const emailRegex = allowSubdomains 
    ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    : /^[^\s@]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/
  
  return emailRegex.test(email)
}

export const EmailInput = ({
  label = 'Email',
  allowSubdomains = true,
  onValidate,
  ...props
}: EmailInputProps) => {
  const handleValidation = (value: string) => {
    const isValid = validateEmail(value, allowSubdomains)
    return onValidate ? onValidate(value) && isValid : isValid
  }

  return (
    <FormInput
      {...props}
      label={label}
      type="email"
      onValidate={handleValidation}
    />
  )
}
