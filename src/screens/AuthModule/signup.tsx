import React, { useState } from 'react';
import styles from "./../../styles/screens/AuthModule/SignUp.styles";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { signup } from '../../redux/slices/auth/authSlice';

type SignUpScreenProps = {
  navigation: any;
};

const SignUpScreen: React.FC<SignUpScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailValid, setEmailValid] = useState(true);
  const [passwordStrength, setPasswordStrength] = useState('');

  // Validación de email en tiempo real
  const handleEmailChange = (text: string) => {
    setEmail(text);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailRegex.test(text));
  };

  // Validación de contraseña
  const handlePasswordChange = (text: string) => {
    setPassword(text);

    // Validación de fortaleza
    const hasUpperCase = /[A-Z]/.test(text);
    const hasLowerCase = /[a-z]/.test(text);
    const hasNumber = /[0-9]/.test(text);
    const hasSpecial = /[!@#$%^&*]/.test(text);
    const minLength = text.length >= 8;

    if (!minLength) setPasswordStrength('Muy corta (mínimo 8 caracteres)');
    else if (!hasUpperCase || !hasLowerCase || !hasNumber || !hasSpecial)
      setPasswordStrength('Débil: debe incluir mayúscula, minúscula, número y símbolo');
    else setPasswordStrength('Segura ✅');
  };

  const handleSignUp = async () => {
    if (!emailValid) {
      alert('Ingresa un correo válido');
      return;
    }
    if (passwordStrength !== 'Segura ✅') {
      alert('La contraseña no es segura');
      return;
    }

    try {
      await dispatch(
        signup({ username, email, password })
      ).unwrap();

      navigation.replace('Login');
    } catch (err) {
      console.log('Error en signup:', err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear cuenta</Text>

      <TextInput
        style={styles.input}
        placeholder="username"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={handleEmailChange}
      />
      {!emailValid && <Text style={styles.error}>Correo inválido</Text>}

      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={handlePasswordChange}
      />
      {password && <Text style={styles.error}>{passwordStrength}</Text>}

      {error && <Text style={styles.error}>{error}</Text>}

      <TouchableOpacity
        style={styles.button}
        onPress={handleSignUp}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Registrarse</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>¿Ya tienes cuenta? Inicia sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

export default SignUpScreen;