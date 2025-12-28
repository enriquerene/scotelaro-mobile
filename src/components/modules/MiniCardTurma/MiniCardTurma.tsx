import * as React from 'react';
import { ImageBackground, Pressable } from 'react-native';
import { styled, Text, View } from 'tamagui';

export interface MiniCardTurmaProps {
  /**
   * Image source for the background
   */
  image: any; // Accept require('./image.jpg') or { uri: 'https://...' }
  /**
   * Title of the class/group
   */
  title: string;
  /**
   * Time of the class (e.g., "7:00")
   */
  time: string;
  /**
   * Days of the week (e.g., "Seg Qua Sex")
   */
  days: string;
  /**
   * Optional size
   */
  size?: number;
  /**
   * Optional overlay opacity
   */
  overlayOpacity?: number;
  /**
   * Optional onPress handler
   */
  onPress?: () => void;
  /**
   * Optional test ID for testing
   */
  testID?: string;
}

const BaseContainer = styled(Pressable, {
  name: 'MiniCardTurmaContainer',
  width: 80, // default size
  height: 80, // default size
  borderRadius: '$radius.lg',
  overflow: 'hidden',
});

// Container receives a `size` prop to control width and height
type BaseContainerProps = React.ComponentProps<typeof BaseContainer> & { size?: number };
const Container = React.forwardRef<any, BaseContainerProps>(({ size, ...props }, ref) => {
  const dimension = size ?? 80;
  return <BaseContainer ref={ref} width={dimension} height={dimension} {...props} />;
});
Container.displayName = 'MiniCardTurmaContainer';

const CardImageBackground = styled(ImageBackground, {
  name: 'MiniCardTurmaBackground',
  width: '100%',
  height: '100%',
  justifyContent: 'space-between',
});

const Overlay = styled(View, {
  name: 'MiniCardTurmaOverlay',
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Keeping rgba for overlay transparency
});

const ContentContainer = styled(View, {
  name: 'MiniCardTurmaContent',
  paddingVertical: '$space.sm',
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
});

const TitleText = styled(Text, {
  name: 'MiniCardTurmaTitle',
  color: '$primary',
  fontWeight: 'bold',
  fontSize: '$size.lg',
  paddingHorizontal: '$space.none',
});

const TimeText = styled(Text, {
  name: 'MiniCardTurmaTime',
  color: '$white',
  fontWeight: 'bold',
  fontSize: '$size.xl',
  paddingVertical: '$space.xs',
});

const DaysText = styled(Text, {
  name: 'MiniCardTurmaDays',
  color: '$white',
  fontSize: '$size.sm',
});

/**
 * MiniCardTurma component displays a class/group card with background image
 */
export const MiniCardTurma = ({
  image,
  title,
  time,
  days,
  onPress,
  testID,
  size = 80,
  overlayOpacity = 50,
}: MiniCardTurmaProps) => {
  return (
    <Container size={size} onPress={onPress} testID={testID}>
      <CardImageBackground source={image} resizeMode="cover">
        <Overlay backgroundColor={`rgba(0, 0, 0, 0.${overlayOpacity})`} />
        <ContentContainer>
          <TitleText testID={`${testID}-title`}>{title}</TitleText>
          <TimeText testID={`${testID}-time`}>{time}</TimeText>
          <DaysText testID={`${testID}-days`}>{days}</DaysText>
        </ContentContainer>
      </CardImageBackground>
    </Container>
  );
};
