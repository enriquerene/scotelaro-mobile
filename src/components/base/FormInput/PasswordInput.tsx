import React from 'react'
import { FormInput } from './FormInput'

export type PasswordInputProps = Omit<React.ComponentProps<typeof FormInput>, 'type'> & {
  label?: string
  minLength?: number
  requireSpecialChar?: boolean
  requireNumber?: boolean
  requireUppercase?: boolean
}

const validatePassword = (
  password: string,
  minLength = 8,
  requireSpecialChar = false,
  requireNumber = false,
  requireUppercase = false
): boolean => {
  if (password.length < minLength) return false
  if (requireSpecialChar && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) return false
  if (requireNumber && !/\d/.test(password)) return false
  if (requireUppercase && !/[A-Z]/.test(password)) return false
  return true
}

export const PasswordInput = ({
  label = 'Password',
  minLength = 8,
  requireSpecialChar = false,
  requireNumber = false,
  requireUppercase = false,
  onValidate,
  ...props
}: PasswordInputProps) => {
  const handleValidation = (value: string) => {
    const isValid = validatePassword(value, minLength, requireSpecialChar, requireNumber, requireUppercase)
    return onValidate ? onValidate(value) && isValid : isValid
  }

  return (
    <FormInput
      {...props}
      label={label}
      type="password"
      onValidate={handleValidation}
    />
  )
}
