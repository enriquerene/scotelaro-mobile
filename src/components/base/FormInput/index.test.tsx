import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { FormInput } from './FormInput'

describe('FormInput', () => {
  it('renders with label', () => {
    const { getByText } = render(
      <FormInput label="Test Label" testID="test-input" />
    )
    expect(getByText('Test Label')).toBeTruthy()
  })

  it('handles text input', () => {
    const onChangeText = jest.fn()
    const { getByTestId } = render(
      <FormInput 
        label="Test" 
        testID="test-input" 
        onChangeText={onChangeText} 
      />
    )
    
    const input = getByTestId('test-input')
    fireEvent.changeText(input, 'test@example.com')
    expect(onChangeText).toHaveBeenCalledWith('test@example.com')
  })

  it('shows error message when error prop is provided', () => {
    const { getByText } = render(
      <FormInput 
        label="Test" 
        testID="test-input" 
        error="Invalid input" 
      />
    )
    
    expect(getByText('Invalid input')).toBeTruthy()
  })

  it('toggles password visibility', () => {
    const { getByTestId, queryByTestId } = render(
      <FormInput 
        label="Password" 
        type="password"
        testID="password-input"
        value="mypassword"
      />
    )
    
    // Initially should be secure
    const input = getByTestId('password-input')
    expect(input.props.secureTextEntry).toBe(true)
    
    // Find and press the visibility toggle
    const toggleButton = getByTestId('password-visibility-toggle')
    fireEvent.press(toggleButton)
    
    // After toggle, should not be secure
    expect(input.props.secureTextEntry).toBe(false)
  })

  it('shows validation error when validation fails', () => {
    const validateEmail = (email: string) => email.includes('@')
    
    const { getByTestId, queryByText } = render(
      <FormInput 
        label="Email" 
        testID="email-input"
        onValidate={validateEmail}
      />
    )
    
    // Type invalid email
    const input = getByTestId('email-input')
    fireEvent.changeText(input, 'invalid-email')
    
    // Should show validation error
    expect(queryByText('Validation failed')).toBeTruthy()
    
    // Type valid email
    fireEvent.changeText(input, 'valid@example.com')
    
    // Should not show validation error
    expect(queryByText('Validation failed')).toBeNull()
  })
})
