import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    marginTop:50,
    textAlign: 'center'
  },
   name: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  price: {
    fontSize: 20,
    color: '#2ecc71',
    marginVertical: 8
  },
  category: {
    fontSize: 14,
    color: '#666'
  },
  owner: {
    fontSize: 14,
    marginTop: 4,
    color: '#444'
  },
  section: {
    marginTop: 20
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: '#333'
  },
  meta: {
    marginTop: 20,
    gap: 6
  },
  error: {
    color: 'red'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5
  },
  image: {
    width: '100%',
    height: 200,
    marginVertical: 10,
    borderRadius: 5
  },
  url: {
    fontSize: 12,
    color: '#555',
    marginBottom: 10
  },
   createButton: {
    backgroundColor: '#198754',
    padding: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 16,
  },
  createButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  button: {
    backgroundColor: '#0d6efd',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
   sellerAvatarContainer: {
    position: 'absolute',
    bottom: 10,
    right: 5,
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#fff',
    backgroundColor: '#fff',
    margin: 50,
  },
  sellerAvatar: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
});
export default styles;