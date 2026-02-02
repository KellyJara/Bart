import React, { useEffect } from 'react';
import { deleteProduct } from '../../redux/slices/product/productSlice';
import { selectIsAdmin } from '../../redux/slices/auth/authSelectors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Product } from '../../redux/types/product.type';
import { addToCart, fetchCart } from '../../redux/slices/cart/cartSlice';
import { fetchFavorites, toggleFavorite } from '../../redux/slices/favorite/favoriteSlice';
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
} from 'react-native';
import { getUserProfileThunk } from '../../redux/slices/user/user';
import styles from './../../styles/screens/ProductModule/Products.style';

type ProductsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Products'
>;

type ProductsScreenProps = {
  navigation: ProductsScreenNavigationProp;
};

const ProductsScreen: React.FC<ProductsScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();

  const isAdmin = useAppSelector(selectIsAdmin);
  const userId = useAppSelector((state) => state.auth.userId);
  

  const { items: products, loading: productsLoading } = useAppSelector(
    (state) => state.products
  );
  const { items: cartItems, loading: cartLoading } = useAppSelector(
    (state) => state.cart
  );
  const { items: favoriteItems, loading: favoritesLoading } = useAppSelector(
    (state) => state.favorite
  );

  // -------------------- Cargar datos al inicio -------------------- //
  useEffect(() => {
    if (userId) {
      dispatch(getUserProfileThunk({ userId }));
      dispatch(fetchCart());
      dispatch(fetchFavorites());
    }
  }, [dispatch, userId]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // -------------------- Acciones -------------------- //

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

  const handleAddToCart = async (product: Product) => {
    try {
      await dispatch(addToCart(product._id)).unwrap();
      Alert.alert('🛒 Carrito', `${product.name} agregado al carrito`);
    } catch (err: any) {
      Alert.alert('Error', err || 'No se pudo agregar el producto al carrito');
    }
  };

  const handleToggleFavorite = async (productId: string) => {
    try {
      await dispatch(toggleFavorite(productId)).unwrap();
    } catch (err: any) {
      Alert.alert('Error', err || 'No se pudo actualizar favoritos');
    }
  };

  if (productsLoading) {
    return <Text style={{ padding: 16 }}>Cargando productos...</Text>;
  }

  // -------------------- Render -------------------- //
  return (
    <View style={{ flex: 1 }}>
      <FlatList<Product>
        data={products}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.container}
        renderItem={({ item }) => {
          const isFavorite = favoriteItems.includes(item._id);
          const isInCart = cartItems.some((cartItem) => cartItem.product._id === item._id);

          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigation.navigate('ProductDetail', { productId: item._id })
              }
            >
              {/* Imagen principal del producto */}
              <View style={{ position: 'relative' }}>
                <Image source={{ uri: item.imgURL }} style={styles.image} />

                {/* Corazón */}
                <TouchableOpacity
                  onPress={() => handleToggleFavorite(item._id)}
                  style={{
                    position: 'absolute',
                    top: 8,
                    left: 8,
                    width: 32,
                    height: 32,
                  }}
                >
                  <Image
                    source={require('../../assets/heart.png')}
                    style={{
                      width: 32,
                      height: 32,
                      tintColor: isFavorite ? 'red' : 'black',
                    }}
                  />
                </TouchableOpacity>

                {/* Carrito */}
                <TouchableOpacity
                  onPress={() => handleAddToCart(item)}
                  style={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    width: 32,
                    height: 32,
                    opacity: cartLoading ? 0.5 : 1,
                  }}
                  disabled={cartLoading}
                >
                  <Image
                    source={require('../../assets/cart.png')}
                    style={{ width: 32, height: 32, tintColor: isInCart ? 'green' : 'black', }}
                  />
                </TouchableOpacity>
              </View>

              {/* Info */}
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.price}>${item.price}</Text>
              <Text style={styles.price}>{item.owner?.username}</Text>

              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Comprar o intercambiar</Text>
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
          );
        }}
      />
    </View>
  );
};

export default ProductsScreen;
