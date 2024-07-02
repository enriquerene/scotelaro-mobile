import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './src/screens/LoginScreen';
import RegistrationScreen from './src/screens/RegistrationScreen';
import HomeScreen from './src/screens/HomeScreen';
import AuthStore from './src/stores/authStore';
import { StoreContext } from './src/StoreContext.tsx';
import authStore from './src/stores/authStore';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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

  const authStore = new AuthStore();

  const handleRegistration = async (
    username: string,
    password: string,
    name: string,
  ): Promise<void> => {
    console.log('triggered');
    const uuid = await authStore.userRegistration(username, password, name);
    console.log(uuid);
  };

  return (
    <StoreContext.Provider value={{ authStore }}>
      <NavigationContainer>
        <Stack.Navigator>
          {!isAuthenticated ? (
            <>
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
                initialParams={{
                  onLoginSuccess: () => setIsAuthenticated(true),
                }}
              />
              <Stack.Screen
                name="Register"
                component={(props: any) => (
                  <RegistrationScreen
                    {...props}
                    onRegistration={handleRegistration}
                  />
                )}
                options={{ headerShown: false }}
                initialParams={{ onRegistrationSuccess: handleRegistration }}
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
    </StoreContext.Provider>
  );
}

export default App;
