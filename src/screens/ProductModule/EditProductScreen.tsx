// src/screens/EditProductScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Switch,
  ScrollView,
  ActivityIndicator,
  Alert,
  Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './../../redux/store';
import { fetchProductById, updateProduct } from './../../redux/slices/product/productSlice';
import { updateProductPayload } from './../../redux/types/product.type';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { launchImageLibrary, Asset } from 'react-native-image-picker';

type RootStackParamList = {
  EditProduct: { id: string };
  ProductList: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'EditProduct'>;

const EditProductScreen: React.FC<Props> = ({ route, navigation }) => {
  const { id } = route.params;
  const dispatch = useDispatch<AppDispatch>();

  const { selectedProduct, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  const [form, setForm] = useState<updateProductPayload>({
    name: '',
    category: '',
    price: 0,
    imgURL: '',
    description: '',
    stock: 0,
    isActive: true,
  });

  const [selectedImage, setSelectedImage] = useState<Asset | null>(null);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedProduct) {
      setForm({
        name: selectedProduct.name,
        category: selectedProduct.category,
        price: selectedProduct.price,
        imgURL: selectedProduct.imgURL,
        description: selectedProduct.description,
        stock: selectedProduct.stock,
        isActive: selectedProduct.isActive,
      });
    }
  }, [selectedProduct]);

  const handleChange = (key: keyof updateProductPayload, value: string | number | boolean) => {
    setForm(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  // 📸 Seleccionar imagen desde galería y subir a Cloudinary
  const selectImage = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo', quality: 0.8 });
    if (!result.assets?.length) return;

    const asset = result.assets[0];
    setSelectedImage(asset);

    try {
      const url = await uploadImageToCloudinary(asset);
      handleChange('imgURL', url); // actualizar la URL del formulario
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

    data.append('upload_preset', 'BartProductImages'); // <-- tu preset de Cloudinary

    const res = await fetch('https://api.cloudinary.com/v1_1/dzipqea6s/image/upload', {
      method: 'POST',
      body: data,
    });

    const result = await res.json();
    return result.secure_url; // URL pública de la imagen
  };

  const handleSubmit = async () => {
    try {
      await dispatch(updateProduct({ id, product: form }));
      Alert.alert('Éxito', 'Producto actualizado correctamente');
      navigation.navigate('ProductList');
    } catch (err) {
      Alert.alert('Error', 'No se pudo actualizar el producto');
    }
  };

  if (loading) return <ActivityIndicator size="large" style={styles.loading} />;
  if (error) return <Text style={styles.error}>{error}</Text>;
  if (!selectedProduct) return <Text style={styles.error}>Producto no encontrado</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Nombre:</Text>
      <TextInput
        style={styles.input}
        value={form.name}
        onChangeText={text => handleChange('name', text)}
      />

      <Text style={styles.label}>Categoría:</Text>
      <TextInput
        style={styles.input}
        value={form.category}
        onChangeText={text => handleChange('category', text)}
      />

      <Text style={styles.label}>Precio:</Text>
      <TextInput
        style={styles.input}
        value={form.price?.toString()}
        onChangeText={text => handleChange('price', Number(text))}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Imagen:</Text>
      <Button title="Seleccionar Imagen" onPress={selectImage} />

      {selectedImage?.uri && (
        <Image source={{ uri: selectedImage.uri }} style={styles.imagePreview} />
      )}
      {/* Si no seleccionaste nueva imagen, mostrar la existente */}
      {form.imgURL !== '' && !selectedImage?.uri && (
        <Image source={{ uri: form.imgURL }} style={styles.imagePreview} />
      )}

      <Text style={styles.label}>Descripción:</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={form.description}
        onChangeText={text => handleChange('description', text)}
        multiline
      />

      <Text style={styles.label}>Stock:</Text>
      <TextInput
        style={styles.input}
        value={form.stock?.toString()}
        onChangeText={text => handleChange('stock', Number(text))}
        keyboardType="numeric"
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Activo:</Text>
        <Switch
          value={form.isActive ?? true}
          onValueChange={value => handleChange('isActive', value)}
        />
      </View>

      <Button title="Guardar Cambios" onPress={handleSubmit} color="#007bff" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 15,
    borderRadius: 5,
  },
});

export default EditProductScreen;
