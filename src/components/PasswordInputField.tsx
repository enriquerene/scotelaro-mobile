import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { textInputStyle } from '../shared/inputStyle';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface PasswordInputFieldProps {
  initialValue?: string;
  onChangeValue: (params: {
    valid: boolean;
    message: string;
    value: string;
  }) => void;
}

const PasswordInputField: React.FC<PasswordInputFieldProps> = ({
  initialValue = '',
  onChangeValue,
}) => {
  const [password, setPassword] = useState<string>(initialValue);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [validationStatus, setValidationStatus] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [touched, setTouched] = useState<boolean>(false);

  const validateInput = () => {
    const minimumLength: number = 8;
    const isValidPassword: boolean = password.length >= minimumLength;
    const message = isValidPassword
      ? ''
      : `A senha deve conter no mínimo ${minimumLength} caracteres.`;
    setValidationStatus(isValidPassword);
    setErrorMessage(message);
    onChangeValue({
      valid: isValidPassword,
      message: message,
      value: password,
    });
  };

  const getErrorStyle: () => {
    borderColor: string;
    color: string;
  } = () => {
    if (!validationStatus && touched) {
      return errorStyle.inputWithError;
    }
    return errorStyle.inputWithoutError;
  };

  const handleChange: (value: string) => void = (value: string) => {
    setPassword(value);
    if (!touched) {
      setTouched(true);
    }
    validateInput();
  };

  const togglePasswordVisibility: () => void = () => {
    setIsVisible(!isVisible);
  };

  return (
    <View style={textInputStyle.container}>
      <View style={[styles.inputWrapper, getErrorStyle()]}>
        <TextInput
          style={styles.input}
          onChangeText={handleChange}
          onBlur={validateInput}
          value={password}
          secureTextEntry={!isVisible}
          placeholder="Senha"
          maxLength={100}
        />
        <TouchableOpacity
          style={styles.toggler}
          onPress={togglePasswordVisibility}>
          <Icon name={isVisible ? 'eye-off' : 'eye'} size={20} color="gray" />
        </TouchableOpacity>
      </View>
      <Text style={errorStyle.message}>{errorMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 60,
    borderColor: 'black',
    borderRadius: 4,
    borderWidth: 1,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 16,
    borderRadius: 4,
    marginRight: 10,
  },
  toggler: {
    padding: 10,
  },
});

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

export default PasswordInputField;
