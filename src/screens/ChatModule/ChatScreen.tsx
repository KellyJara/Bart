import React, { useEffect, useRef, useState } from 'react';
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
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation, NavigationProp } from '@react-navigation/native';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { socket } from '../../redux/slices/chat/socket';
import { addMessage } from '../../redux/slices/chat/chatSlice';
import styles from './../../styles/screens/ChatModule/ChatScreen.styles';
import { COLORS } from '../../styles/Colors';

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

  const flatListRef = useRef<FlatList<Message>>(null);

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

    // scroll al enviar
    setTimeout(() => {
      flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    }, 100);
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
          {new Date(item.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </Text>
      </View>
    );
  };

  return (
    
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} // Ajusta según tu header
    >
        {/* HEADER FIJO */}
      <Text style={styles.header}>Chat con {sellerName}</Text>

        {/* MENSAJES */}
      <FlatList
        ref={flatListRef}
        data={[...messages].reverse()}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        inverted
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.messagesList}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToOffset({ offset: 0, animated: true })
          }
      />
      <SafeAreaView>

        {/* INPUT */}
        <View style={[styles.inputContainer, { paddingBottom: Platform.OS === 'android' ? 6 : 0 }]}>
          
            <TextInput
              style={styles.input}
              placeholder="Escribe un mensaje..."
              value={text}
              onChangeText={setText}
              multiline
            />

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
      </SafeAreaView>
    </KeyboardAvoidingView>
    
  );
};

export default ChatScreen;