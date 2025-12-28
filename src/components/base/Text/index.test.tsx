import React from 'react'
import { render } from '@testing-library/react-native'
import { Text } from './Text'

describe('Text', () => {
  it('renders with default props', () => {
    const { getByText } = render(<Text>Test Text</Text>)
    const text = getByText('Test Text')
    expect(text).toBeTruthy()
  })

  it('applies h1 variant styles', () => {
    const { getByText } = render(<Text variant="h1">Heading 1</Text>)
    const text = getByText('Heading 1')
    expect(text.props.style.fontSize).toBe(32)
    expect(text.props.style.fontWeight).toBe('700')
  })

  it('applies bold prop', () => {
    const { getByText } = render(<Text bold>Bold Text</Text>)
    const text = getByText('Bold Text')
    expect(text.props.style.fontWeight).toBe('600')
  })

  it('applies caption variant styles', () => {
    const { getByText } = render(<Text variant="caption">Caption</Text>)
    const text = getByText('Caption')
    expect(text.props.style.fontSize).toBe(12)
    expect(text.props.style.color).toBe('$textSecondary')
  })
})
