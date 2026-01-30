import React, { useEffect } from 'react';
import {SafeAreaProvider,} from 'react-native-safe-area-context';
import { useAppDispatch, useAppSelector } from './src/redux/hooks';
import { loadToken } from './src/redux/slices/auth/authSlice';
import { AppDispatch } from './src/redux/store';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from './src/screens/AuthModule/login';
import ProductsScreen from './src/screens/ProductModule/Products';
import SignUpScreen from './src/screens/AuthModule/signup';
import RegisterProductScreen from './src/screens/ProductModule/RegisterProduct';
import ProductDetailScreen from './src/screens/ProductModule/ProductDetailScreen';
import ChatScreen from './src/screens/ChatModule/ChatScreen'
import MessageScreen from './src/screens/ChatModule/MessageScreen';
import MyProductsScreen from './src/screens/ProductModule/MyProductsScreen';
import EditProductScreen from './src/screens/ProductModule/EditProductScreen'
import EditProfileScreen from './src/screens/ProfileModule/EditProfileScreen'
import SellerProfileScreen from './src/screens/ProfileModule/SellerProfile';
import ProfileHeaderLeft from './src/components/ProfileHeaderLeft';
import LogoutButton from './src/components/headerRight';

import { initSocketListeners } from './src/redux/slices/chat/socketListeners';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator()

function ProductsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Products"
        component={ProductsScreen}
        options={({ navigation }) => ({
        headerShown: true,
        headerTitle: '',
        headerLeft: () => <ProfileHeaderLeft navigation={navigation} />,
        headerRight: () => <LogoutButton navigation={navigation} />,
       })}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="RegisterProduct"
        component={RegisterProductScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="AddProduct"
        component={RegisterProductScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="MyProducts"
        component={MyProductsScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="EditProduct"
        component={EditProductScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="SellerProfile"
        component={SellerProfileScreen}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
}

/// TAB PRINCIPAL
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: { fontSize: 16, fontWeight: 'bold' }, // opcional: estilo del texto
      }}
    >
      <Tab.Screen
        name="Products"
        component={ProductsStack}
        options={{
          tabBarLabel: 'Products', // texto que aparecerá
        }}
      />
      <Tab.Screen
        name="MessageScreen"
        component={MessageScreen}
        options={{
          headerShown: true,
          tabBarLabel: 'Chat', // texto
        }}
      />
      <Tab.Screen
        name="My Products"
        component={MyProductsScreen}
        options={{
          headerShown: true,
          tabBarLabel: 'My Product', // texto
        }}
      />
    </Tab.Navigator>
  );
}

/// STACK PRINCIPAL (Login / Signup / Tabs)
function AppStack() {
  return (
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
        name="Main"
        component={MainTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatScreen}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
}

function App() {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.auth.userId);

  useEffect(() => {
    if (userId) {
      initSocketListeners(userId);
    }
  }, [userId]);

  useEffect(() => {
    dispatch(loadToken()); // Cargar token guardado al iniciar
  }, [dispatch]);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
          <AppStack/>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
