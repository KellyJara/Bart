import { COLORS } from "../../Colors";
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
    justifyContent: 'center',
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 30,
    textAlign: 'center',
  },

  input: {
    height: 50,
    borderColor: COLORS.secondary,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: COLORS.surface,
    color: COLORS.textPrimary,
  },

  button: {
    height: 50,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '600',
  },

  link: {
    color: COLORS.accent,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
  },

  error: {
    color: COLORS.error,
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default styles;
