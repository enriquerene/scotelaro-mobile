import React from 'react';
import {styled, YStack, Image, Text} from "tamagui";

interface HeroSectionProps {
  /**
   * Title text to be displayed
   */
  title: string;
  /**
   * Optional background image source
   */
  backgroundImage?: string;
  /**
   * Optional background color
   */
  backgroundColor?: string;
  /**
   * Optional overlay color in RGBA format (e.g., "rgba(0,0,0,0.5)")
   */
  overlayRGBA?: string;
  /**
   * Optional title color
   */
  titleColor?: string;
  /**
   * Optional height of the hero section
   */
  height?: number;
}

const HeroContainer = styled(YStack, {
  name: 'HeroContainer',
  width: '100%',
  position: 'relative',
  overflow: 'hidden',
  justifyContent: 'flex-end',
  alignItems: 'flex-start',
  marginBottom: '$sm'
});

const HeroBackground = styled(Image, {
  name: 'HeroBackground',
  position: 'absolute',
  width: '100%',
  height: '100%',
  resizeMode: 'cover',
});

const Overlay = styled(YStack, {
  name: 'HeroOverlay',
  position: 'absolute',
  width: '100%',
  height: '100%',
});

const TitleContainer = styled(YStack, {
  name: 'HeroTitleContainer',
  position: 'absolute',
  bottom: '$md',
  left: '$sm',
  zIndex: 1,
});

const Title = styled(Text, {
  name: 'HeroTitle',
  fontSize: '$xl',
  fontWeight: 'bold',
});

export const HeroSection: React.FC<HeroSectionProps> = ({
    title,
    titleColor = 'white',
    backgroundImage,
    backgroundColor = '#000000',
    overlayRGBA,
    height = 300,
  }: HeroSectionProps) => {
  return (
    <HeroContainer
      backgroundColor={!backgroundImage ? backgroundColor : undefined}
      height={height}
    >
      {backgroundImage && (
        <HeroBackground source={{uri: backgroundImage}} crossOrigin="anonymous" />
      )}
      {overlayRGBA && (
        <Overlay backgroundColor={overlayRGBA}/>
      )}
      <TitleContainer>
        <Title color={titleColor}>{title}</Title>
      </TitleContainer>
    </HeroContainer>
  );
};