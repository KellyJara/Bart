import { COLORS } from "../../Colors";
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 40,
    backgroundColor: COLORS.background,
  },

  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2, // sombra Android
  },

  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
    marginBottom: 12,
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 4,
  },

  price: {
    fontSize: 16,
    color: COLORS.accent,
    marginBottom: 4,
  },

  owner: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },

  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },

  buttonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },

  floatingCartButton : {
  position: 'absolute' as const,
  bottom: 16,
  right: 16,
  width: 48,
  height: 48,
  borderRadius: 24,
  backgroundColor: '#28A745',
  alignItems: 'center' as const,
  justifyContent: 'center' as const,
  zIndex: 100,
},

cartBadge : {
  position: 'absolute' as const,
  top: -4,
  right: -4,
  width: 18,
  height: 18,
  borderRadius: 9,
  backgroundColor: 'red',
  alignItems: 'center' as const,
  justifyContent: 'center' as const,
},
});

export default styles;
