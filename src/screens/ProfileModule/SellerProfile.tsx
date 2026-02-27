import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchOtherUserById, clearOtherUser } from '../../redux/slices/otherUser/otherUser';
import { RootState } from '../../redux/store';
import styles from '../../styles/screens/ProfileModule/SellerProfileScreen.style';

type RouteParams = {
  sellerId: string;
};

const SellerProfileScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const { sellerId } = route.params as RouteParams;

  const { user, products, loading, error } = useAppSelector(
    (state: RootState) => state.otherUser
  );

  useEffect(() => {
    dispatch(fetchOtherUserById(sellerId));
    return () => {
      dispatch(clearOtherUser());
    };
  }, [dispatch, sellerId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error || !user) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>
          {error ?? 'No se pudo cargar el perfil'}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: user.profileImg ?? 'https://ui-avatars.com/api/?name=User' }}
          style={styles.avatar}
        />
        <Text style={styles.username}>{user.username}</Text>
        {user.aboutMe ? (
          <Text style={styles.aboutMe}>{user.aboutMe}</Text>
        ) : (
          <Text style={styles.aboutMeEmpty}>Este vendedor no agregó descripción</Text>
        )}
      </View>

      {/* Productos */}
      <Text style={styles.sectionTitle}>Productos del vendedor</Text>
      {products.length === 0 ? (
        <Text style={styles.emptyText}>Este vendedor no tiene productos publicados</Text>
      ) : (
        <FlatList
  data={products}
  keyExtractor={(item) => item._id}
  numColumns={2} // dos por fila
  contentContainerStyle={styles.productList}
  renderItem={({ item }) => (
    <TouchableOpacity
      style={styles.productCard}
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate('ProductDetail', { productId: item._id })
      }
    >
      <Image source={{ uri: item.imgURL }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  )}
/>
      )}
    </View>
  );
};

export default SellerProfileScreen;