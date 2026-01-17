import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { useAppSelector } from '../redux/hooks';
import { selectIsAdmin, selectIsModerator } from '../redux/auth/authSelectors';
import { RootStackParamList } from '../types/navigation.types';

import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

type Product = {
  id: string;
  name: string;
  price: string;
  image: string;
};

type ProductsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Products'
>;

type ProductsScreenProps = {
  navigation: ProductsScreenNavigationProp;
};

const products: Product[] = [
  { id: '1', name: 'Producto 1', price: '$25', image: 'https://via.placeholder.com/150' },
  { id: '2', name: 'Producto 2', price: '$40', image: 'https://via.placeholder.com/150' },
  { id: '3', name: 'Producto 3', price: '$18', image: 'https://via.placeholder.com/150' },
];

const ProductsScreen: React.FC<ProductsScreenProps> = ({ navigation }) => {

 // const isAdmin = useAppSelector(selectIsAdmin);
  //const isModerator = useAppSelector(selectIsModerator);

  //const canCreateProduct = isAdmin || isModerator;

  return (
    <FlatList<Product>
      data={products}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.container}

      ListHeaderComponent={
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => navigation.navigate('RegisterProduct')}
          >
            <Text style={styles.createButtonText}>+ Crear producto</Text>
          </TouchableOpacity>
      }

      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>{item.price}</Text>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Comprar</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
}

export default ProductsScreen;
const styles = StyleSheet.create({
  container: {
    padding: 16,
  },

  createButton: {
    backgroundColor: '#198754',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 16,
  },
  createButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 150,
    marginBottom: 10,
    borderRadius: 6,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: '#0d6efd',
    marginVertical: 6,
  },
  button: {
    backgroundColor: '#0d6efd',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
