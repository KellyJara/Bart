import { COLORS } from "../../Colors";
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: COLORS.background,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 20,
    textAlign: 'center',
  },

  input: {
    borderWidth: 1,
    borderColor: COLORS.secondary,
    backgroundColor: COLORS.surface,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 15,
    color: COLORS.textPrimary,
  },

  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginVertical: 15,
  },

  url: {
    fontSize: 12,
    color: COLORS.textSecondary,
    marginBottom: 15,
    textAlign: 'center',
  },

  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },

  touchButton: {
  paddingVertical: 12,
  paddingHorizontal: 16,
  borderRadius: 8,
  alignItems: 'center',
  marginTop: 10,
},

touchButtonText: {
  color: COLORS.white,
  fontWeight: 'bold',
  fontSize: 16,
},
});

export default styles;
