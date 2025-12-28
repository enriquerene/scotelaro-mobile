import React from 'react'
import { render } from '@testing-library/react-native'
import { Heading } from './Heading'

describe('Heading', () => {
  it('renders with title', () => {
    const { getByText } = render(
      <Heading title="Test Heading" />
    )
    expect(getByText('Test Heading')).toBeTruthy()
  })

  it('applies small size styles', () => {
    const { getByText } = render(
      <Heading title="Small Heading" size="small" testID="test-heading" />
    )
    const heading = getByText('Small Heading')
    expect(heading.props.variant).toBe('h3')
  })

  it('applies medium size styles by default', () => {
    const { getByText } = render(
      <Heading title="Medium Heading" testID="test-heading" />
    )
    const heading = getByText('Medium Heading')
    expect(heading.props.variant).toBe('h2')
  })

  it('applies large size styles', () => {
    const { getByText } = render(
      <Heading title="Large Heading" size="large" testID="test-heading" />
    )
    const heading = getByText('Large Heading')
    expect(heading.props.variant).toBe('h1')
  })

  it('applies center alignment', () => {
    const { getByText } = render(
      <Heading title="Centered Heading" align="center" testID="test-heading" />
    )
    const heading = getByText('Centered Heading')
    expect(heading.props.textAlign).toBe('center')
  })

  it('applies right alignment', () => {
    const { getByText } = render(
      <Heading title="Right Aligned" align="right" testID="test-heading" />
    )
    const heading = getByText('Right Aligned')
    expect(heading.props.textAlign).toBe('right')
  })

  it('applies custom styles', () => {
    const { getByText } = render(
      <Heading 
        title="Styled Heading" 
        color="$primary" 
        testID="test-heading"
      />
    )
    const heading = getByText('Styled Heading')
    expect(heading.props.color).toBe('$primary')
  })
})
