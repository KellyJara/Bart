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
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootStackParamList } from '../../redux/types/navigation.types';
import { createProduct } from '../../redux/slices/product/productSlice';
import { CreateProductPayload } from '../../redux/types/product.type';
import styles from './styles'

type RegisterProductScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'RegisterProduct'
>;

type RegisterProductScreenProps = {
  navigation: RegisterProductScreenNavigationProp;
};

const RegisterProductScreen: React.FC<RegisterProductScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(state => state.products);

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState<Asset | null>(null);
  const [imgURL, setImgURL] = useState('');

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

        const fileName = asset.fileName || `product_${Date.now()}.jpg`;
        setImgURL(`https://mi-backend.com/uploads/${fileName}`);
      }
    );
  };

  const registerProduct = async () => {
    if (!name || !category || !price || !imgURL) {
      Alert.alert('Error', 'Completa todos los campos');
      return;
    }

    const payload: CreateProductPayload = {
      name,
      category,
      price: Number(price),
      imgURL,
      description: '',
      stock: 0,
      isActive: true,
      inCart: false
    };

    try {
      console.log('📦 PAYLOAD A ENVIAR:', payload);
      await dispatch(createProduct(payload)).unwrap();
      console.log("enviando producto")

      Alert.alert('Éxito', 'Producto registrado');
      navigation.goBack();
    } catch (error: any) {
      Alert.alert('Error', JSON.stringify(error));
    }
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

      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
      />

      <TextInput
        style={styles.input}
        placeholder="Stock"
        keyboardType="numeric"
        value={stock}
        onChangeText={setStock}
      />

      <Button title="Seleccionar Imagen" onPress={selectImage} />

      {image?.uri && (
        <Image source={{ uri: image.uri }} style={styles.image} />
      )}

      {imgURL !== '' && (
        <Text style={styles.url}>{imgURL}</Text>
      )}

      <Button
        title={loading ? 'Registrando...' : 'Registrar Producto'}
        onPress={registerProduct}
        disabled={loading}
      />
    </ScrollView>
  );
};

export default RegisterProductScreen;


