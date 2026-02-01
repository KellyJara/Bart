import React from 'react';
import { TouchableOpacity, Text, Alert } from 'react-native';
import { useAppDispatch } from '../redux/hooks';
import { logout } from '../redux/slices/auth/authSlice';

const LogoutButton = ({ navigation }: any) => {
  const dispatch = useAppDispatch();

  return (
    <TouchableOpacity
      style={{ marginRight: 12 }}
      onPress={() => {
        Alert.alert(
          'Cerrar sesión',
          '¿Seguro que deseas salir?',
          [
            { text: 'Cancelar', style: 'cancel' },
            {
              text: 'Salir',
              style: 'destructive',
              onPress: () => {
                dispatch(logout());
                navigation.replace('Login');
              },
            },
          ]
        );
      }}
    >
      <Text style={{ color: '#FF3B30', fontWeight: '600' }}>Salir</Text>
    </TouchableOpacity>
  );
};

export default LogoutButton;
