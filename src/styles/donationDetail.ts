import { StyleSheet } from 'react-native';
import { colors, fonts, globals } from './index';

export default StyleSheet.create({
  container: {
    ...globals.container,
    paddingTop: 16,
    paddingBottom: 40,
  },
  back: {
    color: colors.primary,
    fontSize: fonts.sizes.body,
    marginBottom: 12,
  },
  mainImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  title: {
    fontSize: fonts.sizes.h2,
    fontWeight: fonts.weights.bold,
    color: colors.text,
    marginTop: 12,
  },
  subtitle: {
    fontSize: fonts.sizes.small,
    color: colors.textLight,
    marginTop: 4,
  },
  tag: {
    backgroundColor: '#E53935',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    marginTop: 8,
  },
  tagText: {
    color: '#FFF',
    fontSize: fonts.sizes.small,
    fontWeight: fonts.weights.bold,
  },
  description: {
    fontSize: fonts.sizes.body,
    color: colors.text,
    marginTop: 12,
    lineHeight: 20,
  },
  progressContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  progressText: {
    marginTop: 8,
    fontSize: fonts.sizes.body,
    color: colors.text,
  },
  cancelText: {
    fontSize: 16,
    marginLeft: 6,
    fontWeight: '600',
    color: '#333',
  },
});
