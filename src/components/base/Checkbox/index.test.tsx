import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import { Checkbox } from './Checkbox'

describe('Checkbox', () => {
  it('renders with label', () => {
    const { getByText } = render(
      <Checkbox 
        label="Test Checkbox" 
        checked={false} 
        onChange={() => {}} 
      />
    )
    expect(getByText('Test Checkbox')).toBeTruthy()
  })

  it('calls onChange when pressed', () => {
    const onChange = jest.fn()
    const { getByTestId } = render(
      <Checkbox 
        label="Test" 
        checked={false} 
        onChange={onChange}
        testID="test-checkbox"
      />
    )
    
    const checkbox = getByTestId('test-checkbox')
    fireEvent.press(checkbox)
    expect(onChange).toHaveBeenCalledWith(true)
  })

  it('toggles between checked and unchecked states', () => {
    const onChange = jest.fn()
    const { getByTestId, update } = render(
      <Checkbox 
        label="Test" 
        checked={false} 
        onChange={onChange}
        testID="test-checkbox"
      />
    )
    
    const checkbox = getByTestId('test-checkbox')
    fireEvent.press(checkbox)
    expect(onChange).toHaveBeenCalledWith(true)
    
    // Update the component with new props
    update(
      <Checkbox 
        label="Test" 
        checked={true} 
        onChange={onChange}
        testID="test-checkbox"
      />
    )
    
    fireEvent.press(checkbox)
    expect(onChange).toHaveBeenCalledWith(false)
  })

  it('does not call onChange when disabled', () => {
    const onChange = jest.fn()
    const { getByTestId } = render(
      <Checkbox 
        label="Disabled Checkbox" 
        checked={false} 
        onChange={onChange}
        disabled={true}
        testID="test-checkbox"
      />
    )
    
    const checkbox = getByTestId('test-checkbox')
    fireEvent.press(checkbox)
    expect(onChange).not.toHaveBeenCalled()
  })

  it('applies disabled styles when disabled', () => {
    const { getByTestId } = render(
      <Checkbox 
        label="Disabled Checkbox" 
        checked={false} 
        onChange={() => {}}
        disabled={true}
        testID="test-checkbox"
      />
    )
    
    const container = getByTestId('test-checkbox').parent
    expect(container.props.opacity).toBe(0.5)
    expect(container.props.pointerEvents).toBe('none')
  })

  it('applies different sizes', () => {
    const { getByTestId, rerender } = render(
      <Checkbox 
        label="Small" 
        checked={false} 
        onChange={() => {}}
        size="small"
        testID="test-checkbox"
      />
    )
    
    // Check small size
    let checkbox = getByTestId('test-checkbox')
    expect(checkbox.props.width).toBe(16)
    expect(checkbox.props.height).toBe(16)
    
    // Test medium size
    rerender(
      <Checkbox 
        label="Medium" 
        checked={false} 
        onChange={() => {}}
        size="medium"
        testID="test-checkbox"
      />
    )
    
    checkbox = getByTestId('test-checkbox')
    expect(checkbox.props.width).toBe(20)
    expect(checkbox.props.height).toBe(20)
  })
})
