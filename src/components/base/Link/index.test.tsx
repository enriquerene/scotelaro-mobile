import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { Link } from './Link'

describe('Link', () => {
  it('renders with label', () => {
    const { getByText } = render(
      <Link 
        label="Test Link" 
        onPress={() => {}} 
      />
    )
    expect(getByText('Test Link')).toBeTruthy()
  })

  it('calls onPress when pressed', () => {
    const onPress = jest.fn()
    const { getByTestId } = render(
      <Link 
        label="Click Me" 
        onPress={onPress}
        testID="test-link"
      />
    )
    
    fireEvent.press(getByTestId('test-link'))
    expect(onPress).toHaveBeenCalled()
  })

  it('does not call onPress when disabled', () => {
    const onPress = jest.fn()
    const { getByTestId } = render(
      <Link 
        label="Disabled Link" 
        onPress={onPress}
        disabled={true}
        testID="test-link"
      />
    )
    
    fireEvent.press(getByTestId('test-link'))
    expect(onPress).not.toHaveBeenCalled()
  })

  it('applies primary variant styles', () => {
    const { getByText } = render(
      <Link 
        label="Primary Link" 
        onPress={() => {}}
        variant="primary"
      />
    )
    
    const link = getByText('Primary Link')
    expect(link.props.variantStyle).toBe('primary')
  })

  it('applies secondary variant styles', () => {
    const { getByText } = render(
      <Link 
        label="Secondary Link" 
        onPress={() => {}}
        variant="secondary"
      />
    )
    
    const link = getByText('Secondary Link')
    expect(link.props.variantStyle).toBe('secondary')
  })

  it('applies underline style when underline prop is true', () => {
    const { getByText } = render(
      <Link 
        label="Underlined Link" 
        onPress={() => {}}
        underline={true}
      />
    )
    
    const link = getByText('Underlined Link')
    expect(link.props.underline).toBe(true)
  })

  it('applies disabled styles when disabled', () => {
    const { getByText } = render(
      <Link 
        label="Disabled Link" 
        onPress={() => {}}
        disabled={true}
      />
    )
    
    const link = getByText('Disabled Link')
    expect(link.props.disabled).toBe(true)
  })
})
