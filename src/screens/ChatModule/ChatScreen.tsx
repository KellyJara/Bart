import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useRoute, useNavigation, NavigationProp } from '@react-navigation/native';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { socket } from '../../redux/slices/chat/socket';
import { addMessage } from '../../redux/slices/chat/chatSlice';
import styles from "./../../styles/screens/ChatModule/ChatScreen.styles";
import { COLORS } from '../../styles/Colors'; // tu paleta

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

  const chat = useAppSelector(state =>
    state.chats.chats.find(c => c.chatId === chatId)
  );
  const messages = chat?.messages ?? [];

  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);

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
    if (!text.trim() || sending) return;

    setSending(true);

    socket.emit('sendMessage', {
      chatId,
      senderId: userId,
      text,
    });

    setText('');
    setSending(false);
  };

  const renderItem = ({ item }: { item: Message }) => {
    const isMe = item.senderId === userId;
    return (
      <View
        style={[
          styles.messageContainer,
          isMe ? styles.myMessage : styles.otherMessage,
        ]}
      >
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.timestamp}>
          {new Date(item.timestamp).toLocaleTimeString()}
        </Text>
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
        keyExtractor={(_, index) => index.toString()}
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

        {/* BOTÓN ENVIAR */}
        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSend}
          activeOpacity={0.7}
          disabled={sending}
        >
          {sending ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <Text style={styles.sendButtonText}>Enviar</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
