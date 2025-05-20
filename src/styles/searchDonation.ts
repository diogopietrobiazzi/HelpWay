// src/styles/searchDonation.ts
import { StyleSheet } from 'react-native';
import { colors, fonts } from './index';

export default StyleSheet.create({
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
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    // sombra Android
    elevation: 3,
    // sombra iOS
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
    paddingBottom: 80, // espaço para a TabBar
  },
});
