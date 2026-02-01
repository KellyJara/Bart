import React, { useEffect, useState } from 'react';
import { deleteProduct } from '../../redux/slices/product/productSlice';
import { selectIsAdmin } from '../../redux/slices/auth/authSelectors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Product } from '../../redux/types/product.type';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootStackParamList } from '../../redux/types/navigation.types';
import { fetchProducts } from '../../redux/slices/product/productSlice';
import {
  View,
  Text,
  Alert,
  FlatList,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import { getUserProfileThunk } from '../../redux/slices/user/user';
import styles from "./../../styles/screens/ProductModule/Products.style";

type ProductsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Products'
>;

type ProductsScreenProps = {
  navigation: ProductsScreenNavigationProp;
};

const ProductsScreen: React.FC<ProductsScreenProps> = ({ navigation }) => {
  const isAdmin = useAppSelector(selectIsAdmin);
  const userId = useAppSelector((state) => state.auth.userId);
  const dispatch = useAppDispatch();
  const { items: products, loading } = useAppSelector((state) => state.products);
  const { user} = useAppSelector((state) => state.user);
  
  useEffect(() => {
    dispatch(getUserProfileThunk({ userId: userId! }));
  }, [dispatch, userId]);

  const handleDelete = (id: string) => {
    Alert.alert(
      'Eliminar producto',
      '¿Estás seguro de que quieres eliminar este producto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await dispatch(deleteProduct(id)).unwrap();
              Alert.alert('Éxito', 'Producto eliminado correctamente');
            } catch (err) {
              Alert.alert('Error', 'No se pudo eliminar el producto');
            }
          },
        },
      ]
    );
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return <Text style={{ padding: 16 }}>Cargando productos...</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Header con perfil y logout */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 16,
        }}
      >
        
      </View>

      {/* Lista de productos */}
      <FlatList<Product>
  data={products}
  keyExtractor={(item) => item._id}
  contentContainerStyle={styles.container}
  renderItem={({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('ProductDetail', { productId: item._id })
      }
    >
      {/* Imagen principal del producto */}
      <Image source={{ uri: item.imgURL }} style={styles.image} />

      {/* Info del producto */}
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>${item.price}</Text>
      <Text style={styles.price}>{item.owner?.username}</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Comprar</Text>
      </TouchableOpacity>

      {isAdmin && (
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#FF3B30', marginTop: 8 }]}
          onPress={() => handleDelete(item._id)}
        >
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  )}
/>

    </View>
  );
};

export default ProductsScreen;
