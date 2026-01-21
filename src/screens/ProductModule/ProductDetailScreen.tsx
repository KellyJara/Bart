import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchProductById } from '../../redux/slices/product/productSlice';
import { RootState } from '../../redux/store';
import styles from './styles'
type RouteParams = {
  productId: string;
};

const ProductDetailScreen: React.FC = () => {
  const route = useRoute();
  const { productId } = route.params as RouteParams;

  const dispatch = useAppDispatch();

  const { selectedProduct, loading, error } = useAppSelector(
    (state: RootState) => state.products
  );

  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  if (!selectedProduct) {
    return (
      <View style={styles.center}>
        <Text>No se encontró el producto</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: selectedProduct.imgURL }}
        style={styles.image}
        resizeMode="cover"
      />

      <Text style={styles.name}>{selectedProduct.name}</Text>

      <Text style={styles.price}>
        ${selectedProduct.price.toFixed(2)}
      </Text>

      <Text style={styles.category}>
        Categoría: {selectedProduct.category}
      </Text>

      <Text style={styles.owner}>
        Dueño: {selectedProduct.owner?.username??'Unknown'}
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Descripción</Text>
        <Text style={styles.description}>
          {selectedProduct.description}
        </Text>
      </View>

      <View style={styles.meta}>
        <Text>Stock: {selectedProduct.stock}</Text>
        <Text>
          Estado: {selectedProduct.isActive ? 'Activo' : 'Inactivo'}
        </Text>
      </View>
    </ScrollView>
  );
};

export default ProductDetailScreen;
