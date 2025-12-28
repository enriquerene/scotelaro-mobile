import * as React from 'react';
import { ImageSourcePropType, Image } from 'react-native';
import { styled, Text, XStack, YStack, View } from 'tamagui';

export interface PendenciaMiniCardProps {
  /** Title at the top of the card */
  title: string;
  /** Price value (e.g., 200) or string */
  price: string | number;
  /** Limit date for payment (e.g., "05/08") */
  paymentDate: string;
  /** Optional image URL for the product */
  imageUrl?: string;
}

// Outer bordered container
const Card = styled(YStack, {
  name: 'PendenciaMiniCard',
  borderWidth: 1,
  borderColor: '$borderColor',
  borderRadius: '$radius.xl',
  backgroundColor: '$background',
  padding: '$md',
  gap: '$sm',
});

const Title = styled(Text, {
  name: 'PendenciaMiniCardTitle',
  color: '$black',
  fontWeight: 'bold',
  fontSize: 22,
});

const InfoRow = styled(XStack, {
  name: 'PendenciaMiniCardInfoRow',
  alignItems: 'center',
  gap: '$md',
});

// const ProductImage = styled(Image, {
//   name: 'PendenciaMiniCardImage',
//   width: 52,
//   height: 52,
//   borderRadius: 8,
// });

const PriceText = styled(Text, {
  name: 'PendenciaMiniCardPrice',
  color: '$success',
  fontWeight: 'bold',
  fontSize: 24,
  lineHeight: 28,
});

const DateText = styled(Text, {
  name: 'PendenciaMiniCardDate',
  color: '$secondary',
  fontSize: 16,
});

const DEFAULT_IMAGE: ImageSourcePropType = {
  uri: 'https://placehold.co/600x400',
};

export const PendenciaMiniCard = ({ title, price, paymentDate, imageUrl }: PendenciaMiniCardProps) => {
  const source: ImageSourcePropType = imageUrl ? { uri: imageUrl } : DEFAULT_IMAGE;
  console.log('received imageURL', imageUrl);
  return (
    <Card>
      <Title numberOfLines={2}>{title}</Title>
      <InfoRow>
        <Image source={source} style={{ width: 52, height: 52 }} crossOrigin="anonymous" />
        <YStack>
          <PriceText>{`R$ ${price},00`}</PriceText>
          <DateText>Até {paymentDate}</DateText>
        </YStack>
      </InfoRow>
    </Card>
  );
};

export default PendenciaMiniCard;
