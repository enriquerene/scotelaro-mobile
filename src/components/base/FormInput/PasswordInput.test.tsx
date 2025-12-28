import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { PasswordInput } from './PasswordInput'

describe('PasswordInput', () => {
  it('renders with default password label', () => {
    const { getByText } = render(
      <PasswordInput testID="password-input" />
    )
    expect(getByText('Password')).toBeTruthy()
  })

  it('renders with custom label', () => {
    const { getByText } = render(
      <PasswordInput label="Confirm Password" testID="password-input" />
    )
    expect(getByText('Confirm Password')).toBeTruthy()
  })

  it('validates password length', () => {
    const onChangeText = jest.fn()
    const { getByTestId } = render(
      <PasswordInput 
        label="Test Password"
        testID="password-input" 
        onChangeText={onChangeText}
        minLength={8}
      />
    )
    
    const input = getByTestId('password-input')
    fireEvent.changeText(input, 'short')
    expect(onChangeText).toHaveBeenCalledWith('short')
  })

  it('validates password with special characters requirement', () => {
    const onChangeText = jest.fn()
    const { getByTestId } = render(
      <PasswordInput 
        label="Test Password"
        testID="password-input" 
        onChangeText={onChangeText}
        requireSpecialChar={true}
      />
    )
    
    const input = getByTestId('password-input')
    fireEvent.changeText(input, 'password123!')
    expect(onChangeText).toHaveBeenCalledWith('password123!')
  })

  it('validates password with number requirement', () => {
    const onChangeText = jest.fn()
    const { getByTestId } = render(
      <PasswordInput 
        label="Test Password"
        testID="password-input" 
        onChangeText={onChangeText}
        requireNumber={true}
      />
    )
    
    const input = getByTestId('password-input')
    fireEvent.changeText(input, 'password123')
    expect(onChangeText).toHaveBeenCalledWith('password123')
  })

  it('validates password with uppercase requirement', () => {
    const onChangeText = jest.fn()
    const { getByTestId } = render(
      <PasswordInput 
        label="Test Password"
        testID="password-input" 
        onChangeText={onChangeText}
        requireUppercase={true}
      />
    )
    
    const input = getByTestId('password-input')
    fireEvent.changeText(input, 'Password123')
    expect(onChangeText).toHaveBeenCalledWith('Password123')
  })

  it('uses custom validation function', () => {
    const customValidation = jest.fn().mockReturnValue(true)
    const onChangeText = jest.fn()
    const { getByTestId } = render(
      <PasswordInput 
        label="Test Password"
        testID="password-input" 
        onChangeText={onChangeText}
        onValidate={customValidation}
      />
    )
    
    const input = getByTestId('password-input')
    fireEvent.changeText(input, 'testpassword')
    expect(customValidation).toHaveBeenCalledWith('testpassword')
  })

  it('shows password toggle when text is entered', () => {
    const { getByTestId } = render(
      <PasswordInput 
        label="Test Password"
        testID="password-input"
        initialValue="password123"
      />
    )
    
    const input = getByTestId('password-input')
    expect(input.props.secureTextEntry).toBe(true)
  })
})
