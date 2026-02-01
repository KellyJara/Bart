import { COLORS } from "../../Colors";
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    padding: 16,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.primary,
    borderBottomWidth: 1,
    borderColor: COLORS.surface,
    backgroundColor: COLORS.surface,
  },

  messagesList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },

  messageContainer: {
    marginVertical: 6,
    padding: 10,
    borderRadius: 12,
    maxWidth: '80%',
  },

  myMessage: {
    backgroundColor: COLORS.success + '33', // tono suave verde
    alignSelf: 'flex-end',
  },

  otherMessage: {
    backgroundColor: COLORS.surface,
    alignSelf: 'flex-start',
  },

  messageText: {
    fontSize: 16,
    color: COLORS.textPrimary,
  },

  timestamp: {
    fontSize: 10,
    color: COLORS.textSecondary,
    marginTop: 4,
    textAlign: 'right',
  },

  inputContainer: {
    flexDirection: 'row',
    padding: 8,
    borderTopWidth: 1,
    borderColor: COLORS.surface,
    backgroundColor: COLORS.surface,
    alignItems: 'center',
    marginBottom: 40,
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    borderRadius: 20,
    paddingHorizontal: 12,
    marginRight: 8,
    backgroundColor: COLORS.white,
    color: COLORS.textPrimary,
  },

  sendButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  sendButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
});

export default styles;
