import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { textInputStyle } from '../shared/inputStyle';

// Define the type for the component props
interface PasswordInputFieldProps {
  initialValue?: string;
  onChangeValue: (value: string) => void;
}

const PasswordInputField: React.FC<PasswordInputFieldProps> = ({
  initialValue = '',
  onChangeValue,
}) => {
  const [phoneNumber, setPhoneNumber] = useState<string>(initialValue);

  const handleChange = (text: string) => {
    const formattedText = text.replace(/[^0-9]/g, '');
    setPhoneNumber(formattedText);
    onChangeValue(formattedText);
  };

  return (
    <View style={textInputStyle.container}>
      <TextInput
        style={textInputStyle.input}
        onChangeText={handleChange}
        value={phoneNumber}
        placeholder="Senha"
        maxLength={11}
      />
    </View>
  );
};

export default PasswordInputField;
