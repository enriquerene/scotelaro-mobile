import React from 'react';
import { XStack } from 'tamagui';
import { Pressable } from 'react-native';
import { styled, Text } from 'tamagui';
import { Calendar, Clock, MapPin } from '@tamagui/lucide-icons';

interface MiniCardEventoProps {
  /**
   * Title of the event
   */
  title: string;
  /**
   * Date of the event (e.g., "22/08")
   */
  date: string;
  /**
   * Time of the event (e.g., "14:00")
   */
  time: string;
  /**
   * Address of the event
   */
  address: string;
  /**
   * Optional onPress handler
   */
  onPress?: () => void;
  /**
   * Optional testID for accessibility
   */
  testID?: string;
}


const Container = styled(Pressable, {
  name: 'MiniCardEventoContainer',
  width: 260, // Keeping fixed width for consistent card size
  height: 100, // Keeping fixed height for consistent card size
  borderRadius: '$xl',
  borderWidth: 2,
  borderColor: '$gray5',
  paddingVertical: '$md',
  paddingHorizontal: '$md',
  flexDirection: 'column'
});

const Title = styled(Text, {
  name: 'MiniCardEventoTitle',
  fontSize: '$lg',
  fontWeight: 'bold',
  textAlign: 'left',
  color: '$primary',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

const DateTimeContainer = styled(XStack, {
  name: 'MiniCardEventoDateTimeContainer',
  alignItems: 'center',
  justifyContent: 'flex-start',
  flexDirection: 'row',
  marginVertical: '$space.sm',
});

const DateText = styled(Text, {
  name: 'MiniCardEventoDateText',
  fontSize: '$size.md',
  fontWeight: 'bold',
  paddingHorizontal: '$space.sm',
  marginRight: '$space.lg',
  color: '$secondary',
});

const TimeText = styled(Text, {
  name: 'MiniCardEventoTimeText',
  fontSize: '$size.md',
  fontWeight: 'bold',
  paddingHorizontal: '$space.sm',
  color: '$secondary',
});

const AddressText = styled(Text, {
  name: 'MiniCardEventoAddressText',
  fontSize: '$size.md',
  fontWeight: 'bold',
  paddingHorizontal: '$space.sm',
  color: '$secondary',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  maxWidth: '100%',
  flex: 1,
});

const IconContainer = styled(XStack, {
  name: 'MiniCardEventoIconContainer',
  alignItems: 'center',
  justifyContent: 'flex-start',
  flexDirection: 'row',
});

const DateDisplay = ({ date, icon }: { date: string; icon: React.ReactNode }) => {
  return (
    <XStack alignItems="center" justifyContent="flex-start" flexDirection="row">
      <IconContainer>
        {icon}
      </IconContainer>
      <DateText>{date}</DateText>
    </XStack>
  );
};

const TimeDisplay = ({ time, icon }: { time: string; icon: React.ReactNode }) => {
  return (
    <XStack alignItems="center" justifyContent="flex-start" flexDirection="row">
      <IconContainer>
        {icon}
      </IconContainer>
      <TimeText>{time}</TimeText>
    </XStack>
  );
};

const AddressDisplay = ({ address, icon }: { address: string; icon: React.ReactNode }) => {
  return (
    <XStack alignItems="center" justifyContent="flex-start" flexDirection="row">
      <IconContainer width="$size.lg">
        {icon}
      </IconContainer>
      <AddressText>{address}</AddressText>
    </XStack>
  );
};

export const MiniCardEvento = ({
  title,
  date,
  time,
  address,
  onPress,
  testID,
}: MiniCardEventoProps) => {
  return (
    <Container onPress={onPress} testID={testID}>
      <Title>{title}</Title>
      <DateTimeContainer>
        <DateDisplay date={date} icon={<Calendar color="$secondary" size="$size.lg" />} />
        <TimeDisplay time={time} icon={<Clock color="$secondary" size="$size.lg" />} />
      </DateTimeContainer>
      <AddressDisplay address={address} icon={<MapPin color="$secondary" size="$size.xl" />} />
    </Container>
  );
};
