import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { EmailInput } from './EmailInput'

describe('EmailInput', () => {
  it('renders with default email label', () => {
    const { getByText } = render(
      <EmailInput testID="email-input" />
    )
    expect(getByText('Email')).toBeTruthy()
  })

  it('renders with custom label', () => {
    const { getByText } = render(
      <EmailInput label="Work Email" testID="email-input" />
    )
    expect(getByText('Work Email')).toBeTruthy()
  })

  it('validates valid email addresses', () => {
    const onChangeText = jest.fn()
    const { getByTestId } = render(
      <EmailInput 
        testID="email-input" 
        onChangeText={onChangeText}
      />
    )
    
    const input = getByTestId('email-input')
    fireEvent.changeText(input, 'test@example.com')
    expect(onChangeText).toHaveBeenCalledWith('test@example.com')
  })

  it('validates email with subdomains when allowed', () => {
    const onChangeText = jest.fn()
    const { getByTestId } = render(
      <EmailInput 
        testID="email-input" 
        onChangeText={onChangeText}
        allowSubdomains={true}
      />
    )
    
    const input = getByTestId('email-input')
    fireEvent.changeText(input, 'test@mail.example.com')
    expect(onChangeText).toHaveBeenCalledWith('test@mail.example.com')
  })

  it('validates email without subdomains when not allowed', () => {
    const onChangeText = jest.fn()
    const { getByTestId } = render(
      <EmailInput 
        testID="email-input" 
        onChangeText={onChangeText}
        allowSubdomains={false}
      />
    )
    
    const input = getByTestId('email-input')
    fireEvent.changeText(input, 'test@example.com')
    expect(onChangeText).toHaveBeenCalledWith('test@example.com')
  })

  it('uses custom validation function', () => {
    const customValidation = jest.fn().mockReturnValue(true)
    const onChangeText = jest.fn()
    const { getByTestId } = render(
      <EmailInput 
        testID="email-input" 
        onChangeText={onChangeText}
        onValidate={customValidation}
      />
    )
    
    const input = getByTestId('email-input')
    fireEvent.changeText(input, 'test@example.com')
    expect(customValidation).toHaveBeenCalledWith('test@example.com')
  })

  it('has email keyboard type', () => {
    const { getByTestId } = render(
      <EmailInput testID="email-input" />
    )
    
    const input = getByTestId('email-input')
    expect(input.props.keyboardType).toBe('email-address')
  })

  it('handles invalid email format', () => {
    const onChangeText = jest.fn()
    const { getByTestId } = render(
      <EmailInput 
        testID="email-input" 
        onChangeText={onChangeText}
      />
    )
    
    const input = getByTestId('email-input')
    fireEvent.changeText(input, 'invalid-email')
    expect(onChangeText).toHaveBeenCalledWith('invalid-email')
  })
})
