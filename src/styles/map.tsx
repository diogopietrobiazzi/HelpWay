import { StyleSheet, Dimensions } from 'react-native';

export const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    backgroundColor: '#4B4DED',
    padding: 16,
    paddingTop:35,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },

  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  map: {
    width: '100%',
    height: Dimensions.get('window').height * 0.70,
  },

  cardsContainer: {
    flexDirection: 'row',
    padding: 12,
    justifyContent: 'center',
    gap: 12,
  },

  card: {
    backgroundColor: '#4B4DED',
    borderRadius: 16,
    padding: 12,
    width: 120,
    alignItems: 'center',
  },

  cardTitle: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  cardSubtitle: {
    color: '#fff',
    fontSize: 12,
    marginTop: 30,
  },
});


