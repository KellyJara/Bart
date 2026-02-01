import { COLORS } from "../../Colors";
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },

  chatItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: COLORS.surface,
    backgroundColor: COLORS.surface,
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 12,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2, // para Android
  },

  chatTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
  },

  lastMessage: {
    marginTop: 4,
    color: COLORS.textSecondary,
  },
});

export default styles;
