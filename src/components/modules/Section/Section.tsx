import React from 'react';
import { YStack, XStack, styled } from 'tamagui';
import { Link } from '../../base/Link/Link';
import { Text } from '../../base/Text/Text';

export interface SectionProps extends React.ComponentProps<typeof YStack> {
  title: string;
  titleColor?: string;
  linkLabel?: string;
  onLinkPress?: () => void;
  children: React.ReactNode;
  testID?: string;
}

const StyledSection = styled(YStack, {
  name: 'Section',
  width: '$space.full',
  marginVertical: '$sm',
  paddingVertical: 0,
});

const Header = styled(XStack, {
  name: 'SectionHeader',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: '$none',
  paddingVertical: '$none',
  margin: 0,
  // height: 20,
});

const Title = styled(Text, {
  name: 'SectionTitle',
  fontWeight: '600',
  fontSize: '$h2',
});

export const Section = ({
  title,
  titleColor = '$secondary',
  linkLabel,
  onLinkPress,
  children,
  testID,
  ...props
}: SectionProps) => {
  const handleLinkPress = () => {
    console.log('[Section] Link pressed');
    if (onLinkPress) {
      onLinkPress();
    }
  }
  return (
    <StyledSection testID={testID} {...props}>
      <Header>
        <Title color={titleColor}>{title}</Title>
        {linkLabel && (
          <Link
            label={linkLabel}
            onPress={handleLinkPress}
            variant="primary"
            disabled={false}
            testID={`${testID}-link`}
          />
        )}
      </Header>
      {children}
    </StyledSection>
  );
};

export default Section;
