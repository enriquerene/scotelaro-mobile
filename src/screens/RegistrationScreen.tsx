import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Logo from '../components/Logo';
import NameInputField from '../components/NameInputField';
import WhatsAppInputField from '../components/WhatsAppInputField';
import PasswordInputField from '../components/PasswordInputField';
import Button from '../components/Button';
import Link from '../components/Link.tsx';

type RootStackParamList = {
  Registration: {
    onLoginSuccess: () => void;
  };
  Home: undefined;
};

interface onChangeParamsProps {
  params: {
    valid: boolean;
    message: string;
    value: string;
  };
}

type RegistrationScreenRouteProp = RouteProp<
  RootStackParamList,
  'Registration'
>;
type RegistrationScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Registration'
>;

type Props = {
  route: RegistrationScreenRouteProp;
  navigation: RegistrationScreenNavigationProp;
};

const RegistrationScreen: React.FC<Props> = ({ route, navigation, onRegistration}) => {
  console.log(onRegistration);
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = async () => {
    console.log('triggered button');
    const success: boolean =
      fullName !== '' && phoneNumber !== '' && password !== '';
    console.log('fullName', fullName);
    console.log('phoneNumber', phoneNumber);
    console.log('password', password);
    if (success) {
      onRegistration(phoneNumber, password, fullName);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={style.container}>
      <ScrollView style={{ flex: 1 }}>
        <Logo width={280} verticalSpacing={50} />
        <View style={style.form}>
          <NameInputField
            onChangeValue={(paramsProps: onChangeParamsProps): void => {
              if (paramsProps.valid) {
                setFullName(paramsProps.value);
              }
            }}
          />
          <WhatsAppInputField
            onChangeValue={(paramsProps: onChangeParamsProps): void => {
              if (paramsProps.valid) {
                setPhoneNumber(paramsProps.value);
              }
            }}
          />
          <PasswordInputField
            onChangeValue={(paramsProps: onChangeParamsProps): void => {
              if (paramsProps.valid) {
                setPassword(paramsProps.value);
              }
            }}
          />
          <Button title="Registrar" onPress={handleRegistration} />
        </View>
        <Link
          handlePress={() => navigation.navigate('Login')}
          text="Já tenho uma conta."
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const style = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'black',
    flex: 1,
  },
  form: {
    marginVertical: 16,
  },
});

export default RegistrationScreen;
