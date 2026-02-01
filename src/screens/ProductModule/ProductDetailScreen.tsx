import React, { useEffect, useState } from 'react';
import { useRoute, useNavigation, NavigationProp } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchProductById } from '../../redux/slices/product/productSlice';
import { RootState } from '../../redux/store';
import { socket } from '../../redux/slices/chat/socket';
import { addChat } from '../../redux/slices/chat/chatSlice';
import styles from "./../../styles/screens/ProductModule/ProductDetailScreen.styles";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { COLORS } from '../../styles/Colors'; 

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

  const [chatLoading, setChatLoading] = useState(false);

  // Traer producto
  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [dispatch, productId]);

  // Escuchar chat creado
  useEffect(() => {
    const handleChatCreated = (chat: any) => {
      console.log('Chat creado:', chat);
      dispatch(addChat(chat));
      socket.emit('joinRoom', { chatId: chat.chatId });

      setChatLoading(false);

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
    if (!selectedProduct || !userId) return;

    const sellerId = selectedProduct.owner?._id;
    if (!sellerId || userId === sellerId) return;

    setChatLoading(true);

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

  const isOwner =
  !!selectedProduct?.owner?._id &&
  userId === selectedProduct.owner._id;

const canShowChatButton =
  !!userId &&
  !!selectedProduct?.owner?._id &&
  selectedProduct.owner.username !== 'Unknown' &&
  !isOwner;

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

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Descripción</Text>
        <Text style={styles.description}>{selectedProduct.description}</Text>
      </View>

      <View style={styles.meta}>
        <Text>Stock: {selectedProduct.stock}</Text>
        <Text>Estado: {selectedProduct.isActive ? 'Activo' : 'Inactivo'}</Text>
      </View>

      {/* Botón Chat */}
      {canShowChatButton && (
      <TouchableOpacity
        style={[styles.touchButton, { backgroundColor: COLORS.primary }]}
        activeOpacity={0.7}
        onPress={handleCreateChat}
        disabled={chatLoading}
      >
        {chatLoading ? (
          <ActivityIndicator color={COLORS.white} />
        ) : (
          <Text style={styles.touchButtonText}>Chat con vendedor</Text>
        )}
      </TouchableOpacity>
      )}
    </ScrollView>
  );
};

export default ProductDetailScreen;
