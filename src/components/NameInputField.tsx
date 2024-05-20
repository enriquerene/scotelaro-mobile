import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { textInputStyle } from '../shared/inputStyle';

interface NameInputFieldProps {
  initialValue?: string;
  onChangeValue: (params: {
    valid: boolean;
    message: string;
    value: string;
  }) => void;
}

const NameInputField: React.FC<NameInputFieldProps> = ({
  initialValue = '',
  onChangeValue,
}) => {
  const [name, setName] = useState<string>(initialValue);
  const [validationStatus, setValidationStatus] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [touched, setTouched] = useState<boolean>(false);

  const validateInput = () => {
    const namePieces: Array<string> = name.split(' ');
    const numberOfNames: number = namePieces.length;
    const containsManyNames: boolean = numberOfNames >= 2;
    const containsOnlyAlphabeticalChars: boolean =
      namePieces.filter((piece: string) => {
        return piece.match(/^[A-Za-z]+$/);
      }).length === numberOfNames;
    if (!containsManyNames) {
      setValidationStatus(false);
      setErrorMessage('Insira seu nome completo, nome e sobrenome.');
    } else if (!containsOnlyAlphabeticalChars) {
      setValidationStatus(false);
      setErrorMessage('Nome completo só pode conter letras e espaços.');
    } else {
      setValidationStatus(true);
      setErrorMessage('');
    }
    onChangeValue({
      valid: validationStatus,
      message: errorMessage,
      value: name,
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

  const handleChange: (value: string) => void = (value: string) => {
    setName(value);
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
        value={name}
        placeholder="Nome Completo"
        maxLength={100}
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

export default NameInputField;
