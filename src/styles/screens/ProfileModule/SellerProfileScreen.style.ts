import { COLORS } from "../../Colors";
import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const CARD_MARGIN = 10;
const CARD_WIDTH = (width - 20 * 2 - CARD_MARGIN * 2) / 2; // padding container + spacing between cards

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 20,
    paddingBottom: 40,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },
  error: {
    fontSize: 16,
    color: COLORS.error,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: COLORS.primary,
    marginBottom: 10,
  },
  username: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 6,
  },
  aboutMe: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: 16,
  },
  aboutMeEmpty: {
    fontSize: 14,
    fontStyle: "italic",
    color: COLORS.textSecondary,
    textAlign: "center",
    marginBottom: 16,
    opacity: 0.6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 12,
  },
  emptyText: {
    textAlign: "center",
    color: COLORS.textSecondary,
    marginTop: 20,
  },
  productList: {
    paddingBottom: 40,
    alignItems: "flex-start", // clave para alinear columnas
  },
  productCard: {
    width: CARD_WIDTH,
    height: CARD_WIDTH,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    marginBottom: CARD_MARGIN * 2,
    marginRight: CARD_MARGIN, // separa columnas
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: "70%", // imagen ocupa el 70% de la tarjeta
  },
  productInfo: {
    padding: 6,
    flex: 1,
    justifyContent: "center",
  },
  productName: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  productPrice: {
    fontSize: 12,
    color: COLORS.accent,
    marginTop: 2,
  },
});

export default styles;