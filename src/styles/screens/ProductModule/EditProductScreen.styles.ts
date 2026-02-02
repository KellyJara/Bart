import { StyleSheet } from 'react-native';
import { COLORS } from '../../Colors';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: COLORS.background,
  },

  label: {
    fontWeight: 'bold',
    marginBottom: 6,
    color: COLORS.textPrimary,
    fontSize: 14,
  },

  input: {
    borderWidth: 1,
    borderColor: COLORS.secondary,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 15,
    backgroundColor: COLORS.surface,
    color: COLORS.textPrimary,
    fontSize: 15,
  },

  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginTop: 10,
  },

  imagePreview: {
    width: '100%',
    height: 300,
    marginBottom: 15,
    borderRadius: 12,
    backgroundColor: COLORS.surface,
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
    fontSize: 15,
    fontWeight: '600',
  },

  /* ===========================
     BOTÓN: Seleccionar Imagen
     =========================== */
  primaryButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },

  primaryButtonText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 16,
  },

  /* ===========================
     BOTÓN: Guardar Cambios
     =========================== */
  saveButton: {
    backgroundColor: COLORS.accent,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 30,
  },

  saveButtonText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 17,
    letterSpacing: 0.3,
  },
});

export default styles;
