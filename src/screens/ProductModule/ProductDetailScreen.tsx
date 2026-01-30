import React, { useEffect } from 'react';
import { useRoute, useNavigation, NavigationProp } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchProductById } from '../../redux/slices/product/productSlice';
import { RootState } from '../../redux/store';
import { socket } from '../../redux/slices/chat/socket';
import { addChat } from '../../redux/slices/chat/chatSlice';
import styles from './styles';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  Button,
  TouchableOpacity
} from 'react-native';

// Tipado para los params de la ruta
type RouteParams = {
  productId: string;
};

const ProductDetailScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const route = useRoute();
  const navigation = useNavigation<NavigationProp<any>>();

  const { productId } = route.params as RouteParams;

  const { selectedProduct, loading, error } = useAppSelector(
    (state: RootState) => state.products
  );

  const userId = useAppSelector((state: RootState) => state.auth.userId);

  // Traer producto
  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  // Escuchar chat creado
  useEffect(() => {
    const handleChatCreated = (chat: any) => {
      console.log('Chat creado:', chat);

      // Guardar chat en Redux
      dispatch(addChat(chat));

      // Unirse a la sala
      socket.emit('joinRoom', { chatId: chat.chatId });

      // Navegar al ChatScreen
      navigation.navigate('Chat', {
        chatId: chat.chatId,
        sellerName: selectedProduct?.owner?.username ?? 'Vendedor',
      });
    };

    socket.on('chatCreated', handleChatCreated);

    return () => {
      socket.off('chatCreated', handleChatCreated);
    };
  }, [dispatch, navigation, selectedProduct]);

  // Crear chat
  const handleCreateChat = () => {
    if (!selectedProduct) {
      console.warn('Producto no cargado todavía');
      return;
    }
    if (!userId) {
      console.warn('Usuario no logueado');
      return;
    }
    const sellerId = selectedProduct.owner?._id;
    if (!sellerId) {
      console.warn('Producto sin dueño definido');
      return;
    }
    if (userId === sellerId) {
      console.warn('No puedes iniciar un chat contigo mismo');
      return;
    }

    // Emitir evento socket
    socket.emit('createChat', {
      productId: selectedProduct._id,
      buyerId: userId,
      sellerId,
    });
  };

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
      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.category}>Categoría: {selectedProduct.category}</Text>
      <Text style={styles.owner}>Dueño: {selectedProduct.owner?.username ?? 'Unknown'}</Text>
      <Text style={styles.owner}>DueñoId: {selectedProduct.owner?._id ?? 'Unknown'}</Text>
      <View style={styles.sellerAvatarContainer}>
       <TouchableOpacity
        onPress={() => {
        if (selectedProduct.owner?._id) {
        navigation.navigate('SellerProfile', { sellerId: selectedProduct.owner._id });
        }
        }}
        >
       <Image
       source={{ uri: selectedProduct.owner?.profileImg ?? 'https://ui-avatars.com/api/?name=User' }}
       style={styles.sellerAvatar}
       resizeMode="cover"
       />
       </TouchableOpacity>
</View>
      <Text style={styles.owner}>UserId: {userId ?? 'Unknown'}</Text>
      <Text style={styles.owner}>productId: {productId ?? 'Unknown'}</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Descripción</Text>
        <Text style={styles.description}>{selectedProduct.description}</Text>
      </View>

      <View style={styles.meta}>
        <Text>Stock: {selectedProduct.stock}</Text>
        <Text>Estado: {selectedProduct.isActive ? 'Activo' : 'Inactivo'}</Text>
      </View>

      <Button title="Chat con vendedor" onPress={handleCreateChat} />
    </ScrollView>
  );
};

export default ProductDetailScreen;
