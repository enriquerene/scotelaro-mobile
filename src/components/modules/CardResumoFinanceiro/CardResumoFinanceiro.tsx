import React, {useEffect} from 'react';
import {styled, XStack, YStack} from 'tamagui';
import {DateHelper} from '../../../services/DateHelper';
import {Pressable, View} from 'react-native';
import {Text} from '../../base/Text/Text';
import {Smile} from "@tamagui/lucide-icons";

export interface CardResumoFinanceiroProps {
  nomeDoPlano: string;
  valorDoPlano: string;
  dataDeVencimento: string;
  numeroDePendencias: number;
  onPress?: () => void;
  testID?: string;
}

const Container = styled(View, {
  name: 'CardResumoFinanceiroContainer',
  backgroundColor: '$background',
  paddingVertical: '$sm',
  paddingHorizontal: '$xs',
  borderWidth: 0,
  flexDirection: 'row',
  justifyContent: 'space-between',
  margin: 0
});

const LeftContent = styled(View, {
  name: 'CardResumoFinanceiroLeftContent',
  flex: 1,
  justifyContent: 'space-between',
});

const RightContent = styled(View, {
  name: 'CardResumoFinanceiroRightContent',
  alignItems: 'flex-end',
  justifyContent: 'center',
});

const StyledText = styled(Text, {
  variants: {
    type: {
      planName: {
        color: '$secondary',
        fontWeight: 'bold',
        fontSize: 16
      },
      dueDate: {
        color: '$secondary',
        fontWeight: 'normal',
        fontSize: 12
      },
      price: {
        fontSize: 24,
        paddingVertical: '$xs',
        fontWeight: 'bold',
      },
      pendingText: {
        color: '$error',
        fontWeight: 'bold',
        fontSize: 14,
      },
      noPendingText: {
        color: '$secondary',
        fontWeight: 'bold',
        fontSize: 14,
      },
    },
  },
});

const PendingContainer = styled(View, {
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

const NoPendingContainer = styled(YStack, {
  alignItems: 'center',
  justifyContent: 'center',
});


export const CardResumoFinanceiro = ({
                                       nomeDoPlano,
                                       valorDoPlano,
                                       dataDeVencimento,
                                       numeroDePendencias,
                                       onPress,
                                       testID,
                                     }: CardResumoFinanceiroProps) => {
  const getPriceTextColor = () => {
    const dateHelper = new DateHelper(dataDeVencimento);
    const daysRemaining = dateHelper.getDaysRemaining();

    if (daysRemaining < 0) return '$error';
    if (daysRemaining < 7) return '$warning';
    return '$success';
  };

  const PendenciaText = () => {
    if (numeroDePendencias === 0) {
      return (
        <NoPendingContainer>
          <Smile size={20} color="$secondary" />
          <StyledText type="noPendingText">Sem pendências</StyledText>
        </NoPendingContainer>
      );
    }

    return (
      <PendingContainer testID={`${testID}-pendencias`}>
        <StyledText type="pendingText">Você possui</StyledText>
        <StyledText type="pendingText">{numeroDePendencias}</StyledText>
        <StyledText type="pendingText">
          {`pendência${numeroDePendencias > 1 ? 's' : ''}!`}
        </StyledText>
      </PendingContainer>
    );
  };

  const CardContent = () => (
    <Container testID={testID}>
      <LeftContent>
        <StyledText type="planName">{nomeDoPlano}</StyledText>
        <StyledText type="price" color={getPriceTextColor()}>
          {valorDoPlano}
        </StyledText>
        <StyledText type="dueDate">{`Vencimento ${dataDeVencimento}`}</StyledText>
      </LeftContent>
      <RightContent>
        <PendenciaText/>
      </RightContent>
    </Container>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress}>
        <CardContent/>
      </Pressable>
    );
  }

  return <CardContent/>;
};

export default CardResumoFinanceiro;