import React, { useEffect } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Product } from '../../redux/types/product.type';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootStackParamList } from '../../redux/types/navigation.types';
import { fetchProducts } from '../../redux/slices/product/productSlice';
import { logout } from '../../redux/slices/auth/authSlice';
import { View, Text, FlatList, Image, TouchableOpacity, Button } from 'react-native';
import styles from './styles';

type ProductsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Products'
>;

type ProductsScreenProps = {
  navigation: ProductsScreenNavigationProp;
};

const ProductsScreen: React.FC<ProductsScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const { items: products, loading } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return <Text style={{ padding: 16 }}>Cargando productos...</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Botón de logout */}
      <View style={{ padding: 16 }}>
        <Button
          title="Cerrar sesión"
          onPress={() => {
            dispatch(logout());
            navigation.navigate('Login'); // navegar al login
          }}
          color="#FF3B30"
        />
      </View>

      {/* Lista de productos */}
      <FlatList<Product>
        data={products}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.container}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('ProductDetail', { productId: item._id })}
          >
            <Image source={{ uri: item.imgURL }} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>${item.price}</Text>

            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Comprar</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ProductsScreen;
