import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Section } from './Section';
import { Text } from '../../base/Text/Text';

describe('Section', () => {
  it('renders the title correctly', () => {
    const { getByText } = render(
      <Section title="Test Section">
        <Text>Test Content</Text>
      </Section>
    );
    
    expect(getByText('Test Section')).toBeTruthy();
    expect(getByText('Test Content')).toBeTruthy();
  });

  it('renders the link when linkLabel is provided', () => {
    const { getByText } = render(
      <Section 
        title="Test Section" 
        linkLabel="View All" 
        onLinkPress={jest.fn()}
      >
        <Text>Test Content</Text>
      </Section>
    );
    
    expect(getByText('View All')).toBeTruthy();
  });

  it('calls onLinkPress when the link is pressed', () => {
    const mockOnLinkPress = jest.fn();
    
    const { getByText } = render(
      <Section 
        title="Test Section" 
        linkLabel="View All" 
        onLinkPress={mockOnLinkPress}
      >
        <Text>Test Content</Text>
      </Section>
    );
    
    fireEvent.press(getByText('View All'));
    expect(mockOnLinkPress).toHaveBeenCalled();
  });

  it('does not render the link when linkLabel is not provided', () => {
    const { queryByText } = render(
      <Section title="Test Section">
        <Text>Test Content</Text>
      </Section>
    );
    
    expect(queryByText('View All')).toBeNull();
  });

  it('applies custom testID', () => {
    const { getByTestId } = render(
      <Section 
        title="Test Section" 
        testID="custom-section"
      >
        <Text>Test Content</Text>
      </Section>
    );
    
    expect(getByTestId('custom-section')).toBeTruthy();
  });
});
