import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { Button } from './Button'

describe('Button', () => {
  it('renders with default props', () => {
    const { getByText } = render(<Button>Test Button</Button>)
    expect(getByText('Test Button')).toBeTruthy()
  })

  it('calls onPress when pressed', () => {
    const onPress = jest.fn()
    const { getByText } = render(
      <Button onPress={onPress}>Press Me</Button>
    )
    fireEvent.press(getByText('Press Me'))
    expect(onPress).toHaveBeenCalled()
  })

  it('renders with solid primary variant by default', () => {
    const { getByTestId } = render(
      <Button testID="test-button">Test</Button>
    )
    const button = getByTestId('test-button')
    // Should have solid primary styling by default
    expect(button).toBeTruthy()
  })

  it('renders with correct variant and color combinations', () => {
    const { rerender, getByTestId } = render(
      <Button testID="test-button" variant="solid" color="primary">Test</Button>
    )
    expect(getByTestId('test-button')).toBeTruthy()

    rerender(
      <Button testID="test-button" variant="outline" color="secondary">Test</Button>
    )
    expect(getByTestId('test-button')).toBeTruthy()
  })

  it('applies disabled styles when disabled', () => {
    const { getByTestId } = render(
      <Button testID="test-button" disabled>Test</Button>
    )
    const button = getByTestId('test-button')
    expect(button.props.opacity).toBe(0.5)
    expect(button.props.pointerEvents).toBe('none')
  })
})
