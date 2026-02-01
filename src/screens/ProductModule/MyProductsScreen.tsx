import { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import styles from "./../../styles/screens/ProductModule/MyProductsScreen.styles";
import {
  fetchProducts,
  deleteProduct,
} from '../../redux/slices/product/productSlice';
import { selectMyProducts } from '../../redux/slices/auth/authSelectors';
import { RootState, AppDispatch } from '../../redux/store';
import {COLORS} from '../../styles/Colors'

export default function MyProducts() {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<any>();

  const myProducts = useSelector(selectMyProducts);
  const { roles, userId } = useSelector((state: RootState) => state.auth);
  const { loading } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const canDelete = (ownerId: string) =>
    ownerId === userId || roles.includes('ADMIN');

  const handleDelete = (id: string) => {
    Alert.alert(
      'Eliminar producto',
      '¿Seguro que deseas eliminar este producto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => dispatch(deleteProduct(id)),
        },
      ]
    );
  };

  const handleEdit = (productId: string) => {
    navigation.navigate('Products', {
      screen: 'EditProduct',
      params: { id: productId },
    });
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mis productos</Text>

      {/* BOTÓN CREAR PRODUCTO */}
      <TouchableOpacity
        style={[styles.touchButton, { backgroundColor: COLORS.primary }]}
        onPress={() =>
          navigation.navigate('Products', { screen: 'AddProduct' })
        }
      >
        <Text style={styles.touchButtonText}>Crear producto</Text>
      </TouchableOpacity>

      {myProducts.length === 0 ? (
        <Text>No has publicado productos.</Text>
      ) : (
        <FlatList
  data={myProducts}
  keyExtractor={(item) => item._id}
  renderItem={({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleEdit(item._id)}
    >
      {/* Contenedor horizontal para imagen y texto */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {item.imgURL && (
          <Image
            source={{ uri: item.imgURL }} // URL de la imagen del producto
            style={{ width: 50, height: 50, borderRadius: 5, marginRight: 10 }}
            resizeMode="cover"
          />
        )}
        <View>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>${item.price}</Text>
        </View>
      </View>

      {canDelete(item.owner._id) && (
        <TouchableOpacity
          style={[styles.touchButton, { backgroundColor: '#FF3B30', marginTop: 5 }]}
          onPress={() => handleDelete(item._id)}
        >
          <Text style={styles.touchButtonText}>Eliminar</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  )}
/>
      )}
    </View>
  );
}
