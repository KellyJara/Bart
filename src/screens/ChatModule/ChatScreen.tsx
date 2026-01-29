import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { useRoute, useNavigation, NavigationProp } from '@react-navigation/native';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { socket } from '../../redux/slices/chat/socket';
import { addMessage } from '../../redux/slices/chat/chatSlice';

type RouteParams = {
  chatId: string;
  sellerName: string;
};

type Message = {
  senderId: string;
  text: string;
  timestamp: string;
};

const ChatScreen: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation<NavigationProp<any>>();
  const { chatId, sellerName } = route.params as RouteParams;

  const dispatch = useAppDispatch();
  const userId = useAppSelector((state: RootState) => state.auth.userId);

  // Obtener mensajes del chat actual desde Redux
  const chat = useAppSelector(state =>
    state.chats.chats.find(c => c.chatId === chatId)
  );
  const messages = chat?.messages ?? [];

  const [text, setText] = useState('');

  // Unirse a la sala y escuchar mensajes en tiempo real
  useEffect(() => {
    socket.emit('joinRoom', { chatId });

    const handleReceiveMessage = (message: Message) => {
      dispatch(addMessage({ chatId, message }));
    };

    socket.on('receiveMessage', handleReceiveMessage);

    return () => {
      socket.off('receiveMessage', handleReceiveMessage);
    };
  }, [chatId, dispatch]);

  const handleSend = () => {
    if (!text.trim()) return;

    socket.emit('sendMessage', {
      chatId,
      senderId: userId,
      text,
    });

    setText('');
  };

  const renderItem = ({ item }: { item: Message }) => {
    const isMe = item.senderId === userId;
    return (
      <View style={[styles.messageContainer, isMe ? styles.myMessage : styles.otherMessage]}>
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.timestamp}>{new Date(item.timestamp).toLocaleTimeString()}</Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <Text style={styles.header}>Chat con {sellerName}</Text>

      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.messagesList}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escribe un mensaje..."
          value={text}
          onChangeText={setText}
        />
        <Button title="Enviar" onPress={handleSend} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { padding: 16, fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
  messagesList: { paddingHorizontal: 16, paddingBottom: 16 },
  messageContainer: { marginVertical: 6, padding: 10, borderRadius: 8, maxWidth: '80%' },
  myMessage: { backgroundColor: '#DCF8C6', alignSelf: 'flex-end' },
  otherMessage: { backgroundColor: '#ECECEC', alignSelf: 'flex-start' },
  messageText: { fontSize: 16 },
  timestamp: { fontSize: 10, color: '#555', marginTop: 4, textAlign: 'right' },
  inputContainer: { flexDirection: 'row', padding: 8, borderTopWidth: 1, borderColor: '#ddd', marginBottom: 200 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', borderRadius: 20, paddingHorizontal: 12, marginRight: 8 },
});
