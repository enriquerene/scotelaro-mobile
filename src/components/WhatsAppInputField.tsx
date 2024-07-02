import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { textInputStyle } from '../shared/inputStyle';

interface WhatsAppInputFieldProps {
  initialValue?: string;
  onChangeValue: (params: {
    valid: boolean;
    message: string;
    value: string;
  }) => void;
}

const WhatsAppInputField: React.FC<WhatsAppInputFieldProps> = ({
  initialValue = '',
  onChangeValue,
}) => {
  const [phoneNumber, setPhoneNumber] = useState<string>(initialValue);
  const [validationStatus, setValidationStatus] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [touched, setTouched] = useState<boolean>(false);

  const validateInput = () => {
    const isValidPhoneNumber: boolean = phoneNumber.length === 11;
    setValidationStatus(true);
    setErrorMessage('');
    if (!isValidPhoneNumber) {
      setValidationStatus(false);
      setErrorMessage('Insira um número de telefone válido.');
    }
    onChangeValue({
      valid: validationStatus,
      message: errorMessage,
      value: phoneNumber,
    });
  };

  const getErrorStyle: () => {
    borderColor: string;
    color: string;
  } = () => {
    if (validationStatus || !touched) {
      return errorStyle.inputWithoutError;
    }
    return errorStyle.inputWithError;
  };

  const handleChange: (text: string) => void = (text: string) => {
    const formattedText = text
      .replace(/[^0-9]/g, '')
      .replace(/(\d{2})(\d{1,5})(\d+)?/, (_, p1, p2, p3) => {
        if (p3) {
          return `(${p1}) ${p2}-${p3}`;
        }
        if (p2) {
          return `(${p1}) ${p2}`;
        }
        return `(${p1}`;
      })
    setPhoneNumber(formattedText);
    if (!touched) {
      setTouched(true);
    }
    validateInput();
  };

  return (
    <View style={textInputStyle.container}>
      <TextInput
        style={[textInputStyle.input, getErrorStyle()]}
        onChangeText={handleChange}
        onBlur={validateInput}
        value={phoneNumber}
        keyboardType="phone-pad"
        placeholder="WhatsApp"
        maxLength={15}
      />
      <Text style={errorStyle.message}>{errorMessage}</Text>
    </View>
  );
};

const errorStyle = StyleSheet.create({
  inputWithError: {
    borderColor: 'red',
    color: 'red',
  },
  inputWithoutError: {
    borderColor: 'black',
    color: 'black',
  },
  message: {
    color: 'red',
  },
});

export default WhatsAppInputField;
