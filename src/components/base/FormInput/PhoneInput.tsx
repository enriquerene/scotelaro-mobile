import React from 'react'
import { FormInput } from './FormInput'

export type PhoneInputProps = Omit<React.ComponentProps<typeof FormInput>, 'type'> & {
  label?: string
  countryCode?: string
  format?: 'us' | 'international' | 'br' | 'none'
}

const formatPhoneNumber = (value: string, format: 'us' | 'international' | 'br' | 'none'): string => {
  // Remove all non-digit characters
  const digits = value.replace(/\D/g, '')
  
  if (format === 'none') return digits
  
  if (format === 'us') {
    if (digits.length <= 3) return digits
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`
  }
  
  if (format === 'br') {
    // Brazilian format: (XX) XXXXX-XXXX for mobile or (XX) XXXX-XXXX for landline
    if (digits.length <= 2) return `(${digits}`
    if (digits.length <= 3) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
    if (digits.length <= 8) {
      // Landline format: (XX) XXXX-XXXX
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
    }
    // Mobile format: (XX) XXXXX-XXXX
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`
  }
  
  // International format
  if (digits.length <= 3) return `+${digits}`
  return `+${digits.slice(0, 3)} ${digits.slice(3)}`
}

const validatePhoneNumber = (phone: string, format: 'us' | 'international' | 'br' | 'none'): boolean => {
  const digits = phone.replace(/\D/g, '')
  
  if (format === 'us') {
    return digits.length === 10
  }
  
  if (format === 'br') {
    // Brazilian phones: 10 digits for landline (XX XXXX-XXXX) or 11 digits for mobile (XX XXXXX-XXXX)
    return digits.length === 10 || digits.length === 11
  }
  
  if (format === 'international') {
    return digits.length >= 7 && digits.length <= 15
  }
  
  // No format validation
  return digits.length >= 7
}

export const PhoneInput = ({
  label = 'Phone Number',
  countryCode = '+55',
  format = 'br',
  onValidate,
  onChangeText,
  ...props
}: PhoneInputProps) => {
  const handleValidation = (value: string) => {
    const isValid = validatePhoneNumber(value, format)
    return onValidate ? onValidate(value) && isValid : isValid
  }

  const handleChangeText = (text: string) => {
    const formattedText = formatPhoneNumber(text, format)
    if (onChangeText) {
      onChangeText(formattedText)
    }
  }

  return (
    <FormInput
      {...props}
      label={label}
      type="phone"
      onValidate={handleValidation}
      onChangeText={handleChangeText}
    />
  )
}
