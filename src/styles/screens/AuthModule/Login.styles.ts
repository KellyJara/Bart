import {COLORS} from "../../Colors";

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

  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },

  registerText: {
    color: COLORS.textSecondary,
    marginRight: 5,
  },

  link: {
    color: COLORS.accent,
    fontWeight: 'bold',
  },

  errorText: {
    color: COLORS.error,
    textAlign: 'center',
    marginTop: 10,
  },

  loadingText: {
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default styles;
