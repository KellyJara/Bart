import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  Alert,
  ScrollView
} from 'react-native';
import { launchImageLibrary, Asset } from 'react-native-image-picker';

type ProductPayload = {
  name: string;
  category: string;
  price: number;
  imgURL: string;
};

type RegisterProductScreenProps = {
  navigation: any;
};


const RegisterProductScreen: React.FC<RegisterProductScreenProps> = ({ navigation }) => {
  const [name, setName] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [image, setImage] = useState<Asset | null>(null);
  const [imgURL, setImgURL] = useState<string>('');

  const selectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 0.8,
      },
      (response) => {
        if (response.didCancel) return;
        if (!response.assets || response.assets.length === 0) return;

        const asset = response.assets[0];
        setImage(asset);

        // Generación de URL según tu esquema
        const fileName = asset.fileName || `product_${Date.now()}.jpg`;
        setImgURL(`https://mi-backend.com/uploads/${fileName}`);
      }
    );
  };

  const registerProduct = async () => {
    if (!name || !category || !price || !image) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }

    const product: ProductPayload = {
      name,
      category,
      price: Number(price),
      imgURL,
    };

    console.log('Producto a enviar:', product);

    /*
    await fetch('http://TU_IP_LOCAL:3000/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
    */

    Alert.alert('Éxito', 'Producto registrado');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registrar Producto</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={styles.input}
        placeholder="Categoría"
        value={category}
        onChangeText={setCategory}
      />

      <TextInput
        style={styles.input}
        placeholder="Precio"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />

      <Button title="Seleccionar Imagen" onPress={selectImage} />

      {image && (
        <Image
          source={{ uri: image.uri }}
          style={styles.image}
        />
      )}

      {imgURL !== '' && (
        <Text style={styles.url}>{imgURL}</Text>
      )}

      <Button title="Registrar Producto" onPress={registerProduct} />
    </ScrollView>
  );
};

export default RegisterProductScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5
  },
  image: {
    width: '100%',
    height: 200,
    marginVertical: 10,
    borderRadius: 5
  },
  url: {
    fontSize: 12,
    color: '#555',
    marginBottom: 10
  }
});
