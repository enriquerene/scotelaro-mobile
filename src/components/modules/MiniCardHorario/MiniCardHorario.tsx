import * as React from 'react';
import { Pressable } from 'react-native';
import { styled, Text, View } from 'tamagui';

export interface MiniCardHorarioProps {
  /**
   * Horário da turma (e.g., "19:00")
   */
  horario: string;
  /**
   * Dias da semana (e.g., "Seg Qua Sex")
   */
  dias: string;
  /**
   * Estado selecionado: quando true usa borda primária
   */
  featured?: boolean;
  /**
   * Ação ao tocar
   */
  onPress?: () => void;
  /**
   * Test ID
   */
  testID?: string;
}

const Container = styled(Pressable, {
  name: 'MiniCardHorarioContainer',
  borderRadius: '$radius.lg',
  borderWidth: 1,
  width: 88,
  height: 60,
  alignItems: 'center',
  justifyContent: 'center',
});

const Content = styled(View, {
  name: 'MiniCardHorarioContent',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$xxs',
});

const HorarioText = styled(Text, {
  name: 'MiniCardHorarioTime',
  fontWeight: 'bold',
  fontSize: 20,
  lineHeight: 28,
});

const DiasText = styled(Text, {
  name: 'MiniCardHorarioDays',
  fontSize: 12,
});

export const MiniCardHorario = ({
  horario,
  dias,
  featured = false,
  onPress,
  testID,
}: MiniCardHorarioProps) => {
  const borderColor = featured ? '$primary' : '$secondary';
  const textColor = featured ? 'black' : '$secondary';

  return (
    <Container
      onPress={onPress}
      testID={testID}
      borderColor={borderColor}
      backgroundColor={featured ? '$primary2' : '$background'}
    >
      <Content>
        <HorarioText color={textColor} testID={`${testID}-horario`}>
          {horario}
        </HorarioText>
        <DiasText color={textColor} testID={`${testID}-dias`}>
          {dias}
        </DiasText>
      </Content>
    </Container>
  );
};
