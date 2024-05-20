import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './src/screens/LoginScreen';
import RegistrationScreen from './src/screens/RegistrationScreen';
import HomeScreen from './src/screens/HomeScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function MockComponent({ name }) {
  return (
    <View>
      <Text>{name}</Text>
    </View>
  );
}

function MainApp() {
  const { handleLogout } = route.params;
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator>
  );
}

function App() {
  // Assume isAuthenticated comes from your app's state management (like Redux, Context, etc.)
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isAuthenticated ? (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
              initialParams={{ onLoginSuccess: () => setIsAuthenticated(true) }}
            />
            <Stack.Screen
              name="Register"
              component={RegistrationScreen}
              options={{ headerShown: false }}
              initialParams={{ onRegistrationSuccess: console.log }}
            />
          </>
        ) : (
          <Stack.Screen
            name="MainApp"
            component={MainApp}
            options={{ headerShown: false }}
            initialParams={{ handleLogout: () => setIsAuthenticated(false) }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
