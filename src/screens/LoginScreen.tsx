import React from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View, ScrollView } from "react-native";
import { Route, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Logo from "../components/Logo";
import WhatsAppInputField from "../components/WhatsAppInputField";
import PasswordInputField from "../components/PasswordInputField";
import OptionToggler from "../components/OptionToggler";
import Button from "../components/Button";
import Link from "../components/Link.tsx";

type RootStackParamList = {
  Login: {
    onRegistrationSuccess: () => void;
  };
  Home: undefined;
};

type LoginScreenRouteProp = RouteProp<RootStackParamList, "Login">;
type LoginScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Login"
>;

type Props = {
  route: LoginScreenRouteProp;
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({ route, navigation }) => {
  const { onRegistrationSuccess } = route.params;

  const handleLogin = async () => {
    // Perform login logic here...
    const success = true; // Assuming login is successful
    if (success) {
      onRegistrationSuccess();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={style.container}>
      <ScrollView style={{ flex: 1 }}>
        <Logo width={280} verticalSpacing={50} />
        <View style={style.form}>
          <WhatsAppInputField onChangeValue={() => {
          }} />
          <PasswordInputField onChangeValue={() => {
          }} />
          <OptionToggler text="Manter meu login ativo." />
          <Button title="Login" onPress={handleLogin} />
        </View>
        <Link
          handlePress={() => navigation.navigate("Register")}
          text="Não tenho login ainda."
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const style = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "black",
    flex: 1
  },
  form: {
    marginVertical: 16
  }
});

export default LoginScreen;
