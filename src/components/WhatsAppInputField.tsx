import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { textInputStyle } from '../shared/inputStyle';

// Define the type for the component props
interface WhatsAppInputFieldProps {
  initialValue?: string;
  onChangeValue: (value: string) => void;
}

const WhatsAppInputField: React.FC<WhatsAppInputFieldProps> = ({
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
        keyboardType="phone-pad"
        placeholder="WhatsApp"
        maxLength={11}
      />
    </View>
  );
};

export default WhatsAppInputField;
