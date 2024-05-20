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
    const isValidPhoneNumberNoDDD: boolean = phoneNumber.length === 9;
    const isValidPhoneNumberWithDDD: boolean = phoneNumber.length === 11;
    setValidationStatus(true);
    setErrorMessage('');
    if (!isValidPhoneNumberNoDDD && !isValidPhoneNumberWithDDD) {
      setValidationStatus(false);
      setErrorMessage('Insira um número de telefone válido.');
    } else if (isValidPhoneNumberNoDDD) {
      setPhoneNumber(`21${phoneNumber}`);
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
    const formattedText = text.replace(/[^0-9]/g, '');
    setPhoneNumber(formattedText);
    if (!touched) {
      setTouched(true);
    }
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
        maxLength={11}
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
