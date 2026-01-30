import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { login } from "../../redux/slices/auth/authSlice";
import {selectIsConnected} from "../../redux/slices/auth/authSelectors";
import styles from "./styles";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

type LoginScreenProps = {
  navigation: any;
};

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { loading, error, token } = useAppSelector(state => state.auth);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const isConnected = useAppSelector(selectIsConnected);

  const handleLogin = () => {
    dispatch(login({ email, password }));
    console.log('Intentando iniciar sesión con:', { email, password });
    };

  useEffect(() => {
    if (isConnected) {
      navigation.replace('Main');
    }
  }, [isConnected, navigation]);

  /*try {
    URL del backend: usa la IP de tu PC en la red Wi-Fi
    const API_URL = 'http://192.168.1.83:4000/api/auth/signin/';

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    // Verifica si hubo respuesta del servidor
    if (!response.ok) {
        setErrorMessage(data?.message || `Error ${response.status}: ${response.statusText}`);
        return;
      }
      navigation.replace('Products');
      console.log('Login exitoso!');
      console.log('data:', data);

      // Aquí puedes guardar el token o redirigir al usuario
      // Ejemplo: AsyncStorage.setItem('token', data.token);*/
/*
  } catch (error) {
    console.error('Error de conexión:', error);
    setErrorMessage('No se pudo conectar con el servidor. ¿Está el teléfono y la PC en la misma red Wi-Fi?');
  }
};*/

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.7 }]}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Entrar</Text>}
      </TouchableOpacity>

      {loading && <Text>Cargando...</Text>}
      {error && <Text style={{color: 'red'}}>{error}</Text>}
      {token && <Text>Token recibido: {token}</Text>}

      <View style={styles.registerContainer}>
       <Text style={styles.registerText}>¿No tienes cuenta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
             <Text style={styles.link}>Regístrate</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
}

export default LoginScreen;
