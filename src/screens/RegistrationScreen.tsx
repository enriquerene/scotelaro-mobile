import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
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

const RegistrationScreen: React.FC<Props> = ({ route, navigation }) => {
  const { onRegistrationSuccess } = route.params;
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = async () => {
    const success: boolean =
      fullName !== '' && phoneNumber !== '' && password !== '';
    if (success) {
      onRegistrationSuccess();
    }
  };

  return (
    <View style={style.container}>
      <Logo width={280} verticalSpacing={50} />
      <View style={style.form}>
        <NameInputField
          onChangeValue={(params: onChangeParamsProps): void => {
            if (params.valid) {
              setFullName(params.value);
            }
          }}
        />
        <WhatsAppInputField
          onChangeValue={(params: onChangeParamsProps): void => {
            if (params.valid) {
              setPhoneNumber(params.value);
            }
          }}
        />
        <PasswordInputField
          onChangeValue={(params: onChangeParamsProps): void => {
            if (params.valid) {
              setPassword(params.value);
            }
          }}
        />
        <Button title="Registrar" onPress={handleRegistration} />
      </View>
      <Link
        handlePress={() => navigation.navigate('Login')}
        text="Já tenho uma conta."
      />
    </View>
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
