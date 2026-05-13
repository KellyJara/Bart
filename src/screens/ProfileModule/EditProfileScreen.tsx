import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as ImagePicker from 'react-native-image-picker';
import { RootStackParamList } from '../../redux/types/navigation.types';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { updateUserThunk } from '../../redux/slices/user/user';
import { toggleFavorite } from '../../redux/slices/favorite/favoriteSlice';
import styles from "./../../styles/screens/ProfileModule/EditProfileScreen.style";

type ProductsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
   'EditProfile'
   >;

type EditProfileScreenProps = {
  navigation: ProductsScreenNavigationProp;
};

const DEFAULT_AVATAR_URL =
  'https://cdn-icons-png.flaticon.com/512/149/149071.png';

const EditProfileScreen: React.FC<EditProfileScreenProps> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.currentUser);
  const loading = useAppSelector((state) => state.user.loading);
  const favorites = useAppSelector((state) => state.favorite.items);
  const products = useAppSelector((state) => state.products.items);

  const [profileImage, setProfileImage] = useState<string>(
    user?.profileImg || DEFAULT_AVATAR_URL
  );
  const [aboutMe, setAboutMe] = useState<string>(user?.aboutMe || '');

  const favoriteProducts = products.filter((p) =>
  favorites.includes(p._id)
  );

  // Seleccionar imagen del dispositivo
  const pickImage = () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 400,
        maxHeight: 400,
        quality: 0.8,
      },
      (response) => {
        if (response.didCancel) return;

        if (response.errorCode) {
          Alert.alert('Error', 'No se pudo seleccionar la imagen');
          return;
        }

        if (response.assets && response.assets[0].uri) {
          setProfileImage(response.assets[0].uri);
        }
      }
    );
  };

  // Guardar cambios en Redux / backend
  const saveProfile = async () => {
  if (!user) return;

  try {
    await dispatch(
      updateUserThunk({
        userId: user._id, // <-- pasa el ID del usuario
        data: { profileImg: profileImage, aboutMe }
      })
    ).unwrap();

    Alert.alert('Éxito', 'Perfil actualizado correctamente');
    navigation.goBack();
  } catch (error: any) {
    console.log('Error updateProfile:', error);
    Alert.alert('Error', error.message || 'No se pudo actualizar el perfil');
  }
};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar perfil</Text>

      <TouchableOpacity onPress={pickImage}>
        <Image
          source={{ uri: profileImage || DEFAULT_AVATAR_URL }}
          style={styles.avatar}
        />
        <Text style={styles.changeText}>Cambiar foto</Text>
      </TouchableOpacity>

      {/* AboutMe */}
      <Text style={{ marginBottom: 8 }}>Sobre mí:</Text>
      <TextInput
        value={aboutMe}
        onChangeText={setAboutMe}
        placeholder="Escribe algo sobre ti"
        style={{
          width: '80%',
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 8,
          borderRadius: 8,
          marginBottom: 20,
        }}
      />

      <View style={{ marginTop: 30, width: '100%' }}>
  <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>
    Mis favoritos
  </Text>

  {favoriteProducts.length === 0 ? (
    <Text>No tienes productos favoritos</Text>
  ) : (
    <FlatList
      data={favoriteProducts}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <View style={styles.favoriteCard}>
          <Image
            source={{ uri: item.imgURL }}
            style={{ width: 50, height: 50, borderRadius: 8 }}
          />

          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text>{item.name}</Text>
            <Text>${item.price}</Text>
          </View>

          {/* BOTÓN ELIMINAR FAVORITO */}
          <TouchableOpacity
            onPress={() => dispatch(toggleFavorite(item._id))}
          >
            <Text style={{ color: 'red' }}>✕</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  )}
</View>

      <TouchableOpacity style={styles.saveButton} onPress={saveProfile} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.saveButtonText}>Guardar cambios</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default EditProfileScreen;
