import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/authSlice.js";
import { useEffect } from "react";
import {selectIsConnected} from "../redux/authSelectors.js"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
  const { loading, error, token } = useSelector(state => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isConnected = useSelector(selectIsConnected);

  const handleLogin = async () => {
    dispatch(login({ email, password }));
    console.log('Intentando iniciar sesión con:', { email, password });
    };

  useEffect(() => {
    if (isConnected) {
      navigation.navigate('Products');
    }
  }, [isConnected]);

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 32,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#0d6efd',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
  registerText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#555',
  },
  link: {
    color: '#0d6efd',
    fontWeight: 'bold',
  },
});

