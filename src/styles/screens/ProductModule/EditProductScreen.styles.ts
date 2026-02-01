import { COLORS } from "../../Colors";
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: COLORS.background,
  },

  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: COLORS.textPrimary,
  },

  input: {
    borderWidth: 1,
    borderColor: COLORS.secondary,
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: COLORS.surface,
    color: COLORS.textPrimary,
  },

  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-between',
  },

  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 15,
    borderRadius: 10,
  },

  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },

  error: {
    color: COLORS.error,
    textAlign: 'center',
    marginTop: 20,
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
});

export default styles;
