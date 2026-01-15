import {SafeAreaProvider,} from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import LoginScreen from './src/screens/login.js';
import ProductsScreen from './src/screens/products.js';
import SignUpScreen from './src/screens/signup.js';
import RegisterProductScreen from './src/screens/RegisterProduct.js';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { store } from './src/redux/store.js';

const Stack = createNativeStackNavigator();

function App() {

  return (
   <Provider store={store}>
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Signup"
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Products"
            component={ProductsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RegisterProduct"
            component={RegisterProductScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  </Provider>
  );
}

export default App;
