import React, { useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../redux/types/navigation.types';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getSellerProfileThunk } from '../../redux/slices/user/user';
import { Product } from '../../redux/types/product.type';
import styles from "./../../styles/screens/ProfileModule/SellerProfileScreen.style";

type Props = NativeStackScreenProps<RootStackParamList, 'SellerProfile'>;

const DEFAULT_AVATAR_URL =
  'https://ui-avatars.com/api/?name=Seller&background=0D8ABC&color=fff&size=128';

const SellerProfileScreen: React.FC<Props> = ({ route, navigation }) => {
  const { sellerId } = route.params;
  const dispatch = useAppDispatch();

  const { user, products, loading } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (sellerId) {
      dispatch(getSellerProfileThunk({ userId: sellerId }));
    }
  }, [dispatch, sellerId]);

  if (loading || !user) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header: Imagen de perfil y nombre */}
      <View style={styles.header}>
        <Image
          source={{ uri: user.profileImg ?? DEFAULT_AVATAR_URL }}
          style={styles.avatar}
        />
        <Text style={styles.username}>{user.username}</Text>
        {user.aboutMe ? <Text style={styles.about}>{user.aboutMe}</Text> : null}
      </View>

      {/* Lista de productos del vendedor */}
      <Text style={styles.sectionTitle}>Productos del vendedor</Text>
      <FlatList<Product>
        data={user.products}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.productsList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.productCard}
            onPress={() => navigation.navigate('ProductDetail', { productId: item._id })}
          >
            <Image source={{ uri: item.imgURL }} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>${item.price}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default SellerProfileScreen;

