// Export specific input components for developer usage
export { PasswordInput } from './PasswordInput'
export { EmailInput } from './EmailInput'
export { PhoneInput } from './PhoneInput'

// Keep FormInput as internal implementation detail
// Developers should use the specific components above
export { FormInput } from './FormInput'

// Export types for TypeScript users
export type { PasswordInputProps } from './PasswordInput'
export type { EmailInputProps } from './EmailInput'
export type { PhoneInputProps } from './PhoneInput'
