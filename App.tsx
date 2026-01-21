import {SafeAreaProvider,} from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import LoginScreen from './src/screens/AuthModule/login';
import ProductsScreen from './src/screens/ProductModule/Products';
import SignUpScreen from './src/screens/AuthModule/signup';
import RegisterProductScreen from './src/screens/ProductModule/RegisterProduct';
import ProductDetailScreen from './src/screens/ProductModule/ProductDetailScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { store } from './src/redux/store';

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
          <Stack.Screen
            name="ProductDetail"
            component={ProductDetailScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  </Provider>
  );
}

export default App;
