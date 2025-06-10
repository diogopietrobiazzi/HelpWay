import { TbBackground } from 'react-icons/tb';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 37,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#888',
  },
  cardsScrollView: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  cardsContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    width: 260,
    height: 130,
    justifyContent: 'space-between',
    marginRight: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    color: '#1A1A1A',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cardSubtitle: {
    color: '#555',
    fontSize: 14,
  },
  cardButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  cardButton: {
    marginLeft: 8,
    backgroundColor: '#4B4DED',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: 'center',
  },
  cardButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
  },

});