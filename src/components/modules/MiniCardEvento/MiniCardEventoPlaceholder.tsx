import React from 'react';
import { Pressable } from 'react-native';
import { styled, Text, XStack, YStack } from 'tamagui';
import { Calendar, Clock, MapPin } from '@tamagui/lucide-icons';

interface MiniCardEventoPlaceholderProps {
  testID?: string;
}

const Container = styled(Pressable, {
  name: 'MiniCardEventoPlaceholderContainer',
  width: 260,
  height: 100,
  borderRadius: '$xl',
  borderWidth: 2,
  borderColor: '$gray5',
  paddingVertical: '$md',
  paddingHorizontal: '$md',
  alignItems: 'center',
  justifyContent: 'center',
});

const Message = styled(Text, {
  name: 'MiniCardEventoPlaceholderMessage',
  fontSize: '$lg',
  fontWeight: 'bold',
  color: '$gray7',
  textAlign: 'center',
});

const IconsRow = styled(XStack, {
  name: 'MiniCardEventoPlaceholderIconsRow',
  marginTop: '$sm',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$md',
});

export const MiniCardEventoPlaceholder = ({ testID }: MiniCardEventoPlaceholderProps) => {
  return (
    <Container disabled testID={testID} accessibilityLabel="sem-eventos-placeholder">
      <YStack alignItems="center" justifyContent="center">
        <Message>Sem eventos na agenda</Message>
        <IconsRow>
          <Calendar color="$gray7" size="$size.lg" />
          <Clock color="$gray7" size="$size.lg" />
          <MapPin color="$gray7" size="$size.lg" />
        </IconsRow>
      </YStack>
    </Container>
  );
};
