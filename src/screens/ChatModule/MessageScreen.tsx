import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { socket } from '../../redux/slices/chat/socket';
import { setChats, setLoading } from '../../redux/slices/chat/chatSlice';

type Chat = {
  chatId: string;
  productId: string;
  buyerId: string;
  sellerId: string;
  messages: {
    senderId: string;
    text: string;
    timestamp: string;
  }[];
};

const MessagesScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state: RootState) => state.auth.userId);

  const chats = useAppSelector(state => state.chats.chats);
  const loading = useAppSelector(state => state.chats.loading);

  useEffect(() => {
    if (!userId) return;

    // Indicar que estamos cargando
    dispatch(setLoading(true));

    // Pedir los chats al backend
    socket.emit('getChats', { userId });

    // Escuchar la respuesta
    const handleChatsList = (data: Chat[]) => {
      console.log('📩 Chats recibidos en frontend:', data);
      dispatch(setChats(data));
    };

    socket.on('chatsList', handleChatsList);

    // Limpiar listener al desmontar
    return () => {
      socket.off('chatsList', handleChatsList);
    };
  }, [userId, dispatch]);

  const openChat = (chat: Chat) => {
    socket.emit('joinRoom', { chatId: chat.chatId });

    navigation.navigate('Chat', {
      chatId: chat.chatId,
    });
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (chats.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No tienes conversaciones aún</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={chats}
      keyExtractor={(item) => item.chatId}
      renderItem={({ item }) => {
        const lastMessage = item.messages[item.messages.length - 1];

        return (
          <TouchableOpacity
            style={styles.chatItem}
            onPress={() => openChat(item)}
          >
            <Text style={styles.chatTitle}>
              Chat producto: {item.productId}
            </Text>

            {lastMessage ? (
              <Text style={styles.lastMessage} numberOfLines={1}>
                {lastMessage.text}
              </Text>
            ) : (
              <Text style={styles.lastMessage}>Sin mensajes</Text>
            )}
          </TouchableOpacity>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  chatTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  lastMessage: {
    marginTop: 4,
    color: '#555',
  },
});

export default MessagesScreen;
