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
    height: Dimensions.get('window').height * 0.68,
  },

cardsContainer: {
  paddingVertical: 8,
  paddingLeft: 16,
  paddingRight: 16,
  paddingBottom: 60, 
  flexDirection: 'row',
},
card: {
  backgroundColor: '#4B4DED',
  borderRadius: 16,
  padding: 10,
  width: 160,
  height: 120,
  justifyContent: 'space-between',
  marginRight: 12,
},
  cardTitle: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  cardSubtitle: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',

  },
  routeButton: {
  backgroundColor: '#f00',
  paddingVertical: 6,
  paddingHorizontal: 12,
  borderRadius: 8,
  marginTop: 8,
},
routeButtonText: {
  color: '#fff',
  fontWeight: 'bold',
  textAlign: 'center',
},
cardButtonsContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginTop: 10,
  width: '100%',
},
cardButton: {
  flex: 1,
  marginHorizontal: 4,
  backgroundColor: '#f00',
  paddingVertical: 6,
  borderRadius: 8,
  alignItems: 'center',
},

cardButtonText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 12,
},
});


