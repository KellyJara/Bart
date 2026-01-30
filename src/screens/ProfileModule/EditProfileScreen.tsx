import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as ImagePicker from 'react-native-image-picker';
import { RootStackParamList } from '../../redux/types/navigation.types';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { updateUserThunk } from '../../redux/slices/user/user';

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
  const user = useAppSelector((state) => state.user.user);
  const loading = useAppSelector((state) => state.user.loading);

  const [profileImage, setProfileImage] = useState<string>(
    user?.profileImg || DEFAULT_AVATAR_URL
  );
  const [aboutMe, setAboutMe] = useState<string>(user?.aboutMe || '');

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
          userId: user._id,
          data: { profileImg: profileImage, aboutMe },
        })
      ).unwrap();

      Alert.alert('Éxito', 'Perfil actualizado correctamente');
      navigation.goBack();
    } catch (error: any) {
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 10,
  },
  changeText: {
    textAlign: 'center',
    color: '#007AFF',
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default EditProfileScreen;
