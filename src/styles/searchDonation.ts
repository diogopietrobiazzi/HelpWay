import { StyleSheet } from 'react-native';
import { colors, fonts } from './index';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  searchRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 15,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardContent: {
    marginTop: 12,
  },
  heading: {
    fontSize: fonts.sizes.h2,
    fontWeight: fonts.weights.bold,
    color: colors.text,
    marginBottom: 6,
  },
  desc: {
    fontSize: fonts.sizes.small,
    color: colors.textLight,
    lineHeight: 18,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000088',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: fonts.sizes.title,
    fontWeight: 'bold',
    marginBottom: 12,
    color: colors.text,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  distanceLabel: {
    marginVertical: 8,
    fontSize: fonts.sizes.title,
    color: colors.text,
  },
  closeButton: {
    marginTop: 12,
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  closeText: {
    color: 'white',
    fontWeight: 'bold',
  },
  tabBarContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: colors.background,
  },
  typeButton: {
    padding: 10,
    marginVertical: 5,
    marginRight: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f0f0f0',
},
  typeButtonSelected: {
    backgroundColor: '#2D4BFF',
    borderColor: '#2D4BFF',
},
  typeButtonText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '600',
},

});
