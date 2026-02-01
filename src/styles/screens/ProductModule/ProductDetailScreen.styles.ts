import { COLORS } from "../../Colors";
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: COLORS.background,
    alignItems: 'center',
  },

  center: {
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

  image: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    marginBottom: 20,
  },

  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 8,
    textAlign: 'center',
  },

  price: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.accent,
    marginBottom: 8,
  },

  category: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },

  owner: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 4,
  },

  sellerAvatarContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },

  sellerAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: COLORS.primary,
  },

  section: {
    width: '100%',
    marginVertical: 12,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 6,
  },

  description: {
    fontSize: 16,
    color: COLORS.textPrimary,
  },

  meta: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
    paddingHorizontal: 4,
  },

  chatButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },

  chatButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },

  touchButton: {
  paddingVertical: 12,
  paddingHorizontal: 16,
  borderRadius: 8,
  alignItems: 'center',
  marginTop: 20,
},

touchButtonText: {
  color: COLORS.white,
  fontWeight: 'bold',
  fontSize: 16,
},

});

export default styles;
