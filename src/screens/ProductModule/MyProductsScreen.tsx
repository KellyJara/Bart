import { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  Alert,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import {
  fetchProducts,
  deleteProduct,
} from '../../redux/slices/product/productSlice';
import { selectMyProducts } from '../../redux/slices/auth/authSelectors';
import { RootState, AppDispatch } from '../../redux/store';

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

      {/* 🔹 BOTÓN CREAR PRODUCTO */}
      <View style={styles.createButton}>
        <Button
          title="Crear producto"
          onPress={() => navigation.navigate('Products', {
          screen: 'AddProduct',
        })}
        />
      </View>

      {myProducts.length === 0 ? (
        <Text>No has publicado productos.</Text>
      ) : (
        <FlatList
          data={myProducts}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.name}>{item.name}</Text>
              <Text>${item.price}</Text>

              {canDelete(item.owner._id) && (
                <View style={styles.button}>
                  <Button
                    title="Eliminar"
                    color="#d32f2f"
                    onPress={() => handleDelete(item._id)}
                  />
                </View>
              )}
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  createButton: {
    marginBottom: 16,
  },
  card: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  button: {
    marginTop: 10,
  },
});
