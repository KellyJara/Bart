import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { launchImageLibrary, Asset } from 'react-native-image-picker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootStackParamList } from '../../redux/types/navigation.types';
import { createProduct } from '../../redux/slices/product/productSlice';
import { CreateProductPayload } from '../../redux/types/product.type';
import styles from "./../../styles/screens/ProductModule/RegisterProduct.style";
import { COLORS } from '../../styles/Colors'; // Asegúrate de tener tu paleta

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
  const userId = useAppSelector(state => state.auth.userId);

  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('');
  const [image, setImage] = useState<Asset | null>(null);
  const [imgURL, setImgURL] = useState('');

  const selectImage = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo', quality: 0.8 });
    if (!result.assets?.length) return;

    const asset = result.assets[0];
    setImage(asset);

    try {
      const url = await uploadImageToCloudinary(asset);
      setImgURL(url);
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'No se pudo subir la imagen a Cloudinary');
    }
  };

  const uploadImageToCloudinary = async (asset: Asset) => {
    if (!asset.uri) throw new Error('URI inválido');

    const data = new FormData();
    data.append('file', {
      uri: asset.uri,
      type: asset.type || 'image/jpeg',
      name: asset.fileName || `product_${Date.now()}.jpg`,
    } as any);

    data.append('upload_preset', 'BartProductImages');

    const res = await fetch('https://api.cloudinary.com/v1_1/dzipqea6s/image/upload', {
      method: 'POST',
      body: data,
    });

    const result = await res.json();
    return result.secure_url;
  };

  const registerProduct = async () => {
    if (!name || !category || !price || !imgURL) {
      Alert.alert('Error', 'Completa todos los campos y selecciona una imagen');
      return;
    }

    const payload: CreateProductPayload = {
      name,
      category,
      price: Number(price),
      imgURL,
      description,
      stock: Number(stock) || 0,
      isActive: true,
      inCart: false,
    };

    try {
      await dispatch(createProduct(payload)).unwrap();
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

      {/* Botón Seleccionar Imagen */}
      <TouchableOpacity
        style={[styles.touchButton, { backgroundColor: COLORS.primary }]}
        activeOpacity={0.7}
        onPress={selectImage}
      >
        <Text style={styles.touchButtonText}>Seleccionar Imagen</Text>
      </TouchableOpacity>

      {image?.uri && <Image source={{ uri: image.uri }} style={styles.image} />}
      {imgURL !== '' && <Text style={styles.url}>Imagen subida: {imgURL}</Text>}

      {/* Botón Registrar Producto */}
      <TouchableOpacity
        style={[styles.touchButton, { backgroundColor: COLORS.primary }]}
        activeOpacity={0.7}
        onPress={registerProduct}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color={COLORS.white} />
        ) : (
          <Text style={styles.touchButtonText}>Registrar Producto</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default RegisterProductScreen;
