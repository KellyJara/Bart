import React, { useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchCart, removeFromCart } from '../../redux/slices/cart/cartSlice';
import styles from '../../styles/screens/ProductModule/Products.style';

const MyCartScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: cartItems, loading, error } = useAppSelector((state) => state.cart);

  // -------------------- Cargar carrito al iniciar -------------------- //
  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  // -------------------- Eliminar producto -------------------- //
  const handleRemoveFromCart = (productId: string) => {
    Alert.alert(
      'Quitar del carrito',
      '¿Estás seguro de que quieres quitar este producto del carrito?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Quitar',
          style: 'destructive',
          onPress: async () => {
            try {
              await dispatch(removeFromCart(productId)).unwrap();
            } catch (err) {
              Alert.alert('Error', 'No se pudo quitar el producto del carrito');
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return <Text style={{ padding: 16 }}>Cargando carrito...</Text>;
  }

  if (error) {
    return <Text style={{ padding: 16 }}>Error: {error}</Text>;
  }

  if (!cartItems || cartItems.length === 0) {
    return <Text style={{ padding: 16 }}>Tu carrito está vacío 😢</Text>;
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={cartItems.filter(item => item.product)} // ⚡ filtrar productos nulos
        keyExtractor={(item) => item.product?._id || Math.random().toString()}
        renderItem={({ item }) => {
          const product = item.product;
          if (!product) return null; // protección extra

          return (
            <View style={styles.card}>
              {/* Imagen */}
              <Image source={{ uri: product.imgURL }} style={[styles.image, { aspectRatio: 1 }]} />

              {/* Info */}
              <View style={{ flex: 1, marginLeft: 8 }}>
                <Text style={styles.name}>{product.name}</Text>
                <Text style={styles.price}>${product.price}</Text>
                <Text>Cantidad: {item.quantity}</Text>
              </View>

              {/* Botón eliminar */}
              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#FF3B30' }]}
                onPress={() => handleRemoveFromCart(product._id)}
              >
                <Text style={styles.buttonText}>Quitar</Text>
              </TouchableOpacity>
            </View>
          );
        }}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
  );
};

export default MyCartScreen;