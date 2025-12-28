import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { PhoneInput } from './PhoneInput'

describe('PhoneInput', () => {
  it('renders with default phone label', () => {
    const { getByText } = render(
      <PhoneInput testID="phone-input" />
    )
    expect(getByText('Phone Number')).toBeTruthy()
  })

  it('renders with custom label', () => {
    const { getByText } = render(
      <PhoneInput label="Mobile Number" testID="phone-input" />
    )
    expect(getByText('Mobile Number')).toBeTruthy()
  })

  it('formats US phone number correctly', () => {
    const onChangeText = jest.fn()
    const { getByTestId } = render(
      <PhoneInput 
        testID="phone-input" 
        onChangeText={onChangeText}
        format="us"
      />
    )
    
    const input = getByTestId('phone-input')
    fireEvent.changeText(input, '1234567890')
    expect(onChangeText).toHaveBeenCalledWith('(123) 456-7890')
  })

  it('formats international phone number correctly', () => {
    const onChangeText = jest.fn()
    const { getByTestId } = render(
      <PhoneInput 
        testID="phone-input" 
        onChangeText={onChangeText}
        format="international"
      />
    )
    
    const input = getByTestId('phone-input')
    fireEvent.changeText(input, '1234567890')
    expect(onChangeText).toHaveBeenCalledWith('+123 4567890')
  })

  it('does not format when format is none', () => {
    const onChangeText = jest.fn()
    const { getByTestId } = render(
      <PhoneInput 
        testID="phone-input" 
        onChangeText={onChangeText}
        format="none"
      />
    )
    
    const input = getByTestId('phone-input')
    fireEvent.changeText(input, '1234567890')
    expect(onChangeText).toHaveBeenCalledWith('1234567890')
  })

  it('validates US phone number length', () => {
    const onChangeText = jest.fn()
    const { getByTestId } = render(
      <PhoneInput 
        testID="phone-input" 
        onChangeText={onChangeText}
        format="us"
      />
    )
    
    const input = getByTestId('phone-input')
    fireEvent.changeText(input, '123456789') // 9 digits
    expect(onChangeText).toHaveBeenCalledWith('(123) 456-789')
  })

  it('validates international phone number length', () => {
    const onChangeText = jest.fn()
    const { getByTestId } = render(
      <PhoneInput 
        testID="phone-input" 
        onChangeText={onChangeText}
        format="international"
      />
    )
    
    const input = getByTestId('phone-input')
    fireEvent.changeText(input, '1234567')
    expect(onChangeText).toHaveBeenCalledWith('+123 4567')
  })

  it('uses custom validation function', () => {
    const customValidation = jest.fn().mockReturnValue(true)
    const onChangeText = jest.fn()
    const { getByTestId } = render(
      <PhoneInput 
        testID="phone-input" 
        onChangeText={onChangeText}
        onValidate={customValidation}
      />
    )
    
    const input = getByTestId('phone-input')
    fireEvent.changeText(input, '1234567890')
    expect(customValidation).toHaveBeenCalledWith('(123) 456-7890')
  })

  it('has phone keyboard type', () => {
    const { getByTestId } = render(
      <PhoneInput testID="phone-input" />
    )
    
    const input = getByTestId('phone-input')
    expect(input.props.keyboardType).toBe('phone-pad')
  })

  it('removes non-digit characters during formatting', () => {
    const onChangeText = jest.fn()
    const { getByTestId } = render(
      <PhoneInput 
        testID="phone-input" 
        onChangeText={onChangeText}
        format="us"
      />
    )
    
    const input = getByTestId('phone-input')
    fireEvent.changeText(input, '(123) 456-7890')
    expect(onChangeText).toHaveBeenCalledWith('(123) 456-7890')
  })
})
