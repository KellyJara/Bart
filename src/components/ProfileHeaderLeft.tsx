import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useAppSelector } from '../../src/redux/hooks';

const DEFAULT_AVATAR_URL =
  'https://cdn-icons-png.flaticon.com/512/149/149071.png';

const ProfileHeaderLeft = ({ navigation }: any) => {
  const { user } = useAppSelector(state => state.user);

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('EditProfile')}
      style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 8 }}
    >
      <Image
        source={{ uri: user?.profileImg ?? DEFAULT_AVATAR_URL }}
        style={{ width: 36, height: 36, borderRadius: 18, marginRight: 8 }}
      />
      <Text style={{ fontWeight: '600', fontSize: 16 }}>
        {user?.username}
      </Text>
    </TouchableOpacity>
  );
};

export default ProfileHeaderLeft;
