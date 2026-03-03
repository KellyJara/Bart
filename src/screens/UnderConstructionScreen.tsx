import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const UnderConstructionScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Sección en construcción!</Text>
      <Text style={styles.subtitle}>Esta funcionalidad estará disponible pronto.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 24,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
  },
});

export default UnderConstructionScreen;