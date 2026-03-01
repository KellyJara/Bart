import React, { useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { addToCart, fetchCart, removeFromCart } from '../../redux/slices/cart/cartSlice';
import { deleteProduct, fetchProducts } from '../../redux/slices/product/productSlice';
import { fetchFavorites, toggleFavorite } from '../../redux/slices/favorite/favoriteSlice';
import { getUserProfileThunk } from '../../redux/slices/user/user';
import { selectIsAdmin } from '../../redux/slices/auth/authSelectors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Product } from '../../redux/types/product.type';
import { RootStackParamList } from '../../redux/types/navigation.types';
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

  const { items: products, loading: productsLoading } = useAppSelector(state => state.products);
  const { items: cartItems, loading: cartLoading } = useAppSelector(state => state.cart);
  const { items: favoriteItems } = useAppSelector(state => state.favorite);

  // -------------------- Cargar datos al inicio -------------------- //
  useEffect(() => {
    if (userId) {
      dispatch(getUserProfileThunk({ userId }));
      dispatch(fetchCart());
      dispatch(fetchFavorites());
    }
    dispatch(fetchProducts());
  }, [dispatch, userId]);

  // -------------------- Handlers -------------------- //
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

  const handleToggleFavorite = async (productId: string) => {
    try {
      await dispatch(toggleFavorite(productId)).unwrap();
    } catch (err) {
      Alert.alert('Error', 'No se pudo actualizar favoritos');
    }
  };

  const handleToggleCart = async (product: Product) => {
    const isInCart = cartItems.some(
      (cartItem) => cartItem.product && cartItem.product._id === product._id
    );

    try {
      if (isInCart) {
        await dispatch(removeFromCart(product._id)).unwrap();
      } else {
        await dispatch(addToCart(product._id)).unwrap();
      }
    } catch (err) {
      Alert.alert('Error', 'No se pudo actualizar el carrito');
    }
  };

  if (productsLoading) return <Text style={{ padding: 16 }}>Cargando productos...</Text>;

  // -------------------- Filtrar productos del usuario actual -------------------- //
  const productsToShow = products.filter(
    (product) => product.owner?._id !== userId
  );

  // -------------------- Render -------------------- //
  return (
    <View style={{ flex: 1 }}>
      {/* BOTÓN FLOTANTE DE CARRITO */}
      <TouchableOpacity
        style={styles.floatingCartButton}
        onPress={() => navigation.navigate('MyCart')}
      >
        <Image
          source={require('../../assets/cart.png')}
          style={{ width: 32, height: 32, tintColor: 'white' }}
        />
        {/*{Array.isArray(cartItems) && cartItems.length > 0 && (
          <View style={cartBadge}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12 }}>
              {cartItems.length}
            </Text>
          </View>
        )}*/}
      </TouchableOpacity>

      <FlatList<Product>
        data={productsToShow}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.container}
        renderItem={({ item }) => {
          const isFavorite = favoriteItems.includes(item._id);
          const isInCart = cartItems.some(
            (cartItem) => cartItem.product && cartItem.product._id === item._id
          );

          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() =>
                navigation.navigate('ProductDetail', { productId: item._id })
              }
            >
              {/* Imagen principal */}
              <View style={{ position: 'relative' }}>
                <Image source={{ uri: item.imgURL }} style={[styles.image, { aspectRatio: 1 }]} />

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

                {/* Carrito individual */}
                <TouchableOpacity
                  onPress={() => handleToggleCart(item)}
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
                    style={{
                      width: 32,
                      height: 32,
                      tintColor: isInCart ? 'green' : 'black',
                    }}
                  />
                </TouchableOpacity>
              </View>

              {/* Info del producto */}
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