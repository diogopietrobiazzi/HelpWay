import { StyleSheet } from 'react-native';
import { colors, fonts, globals } from './index';

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainImage: {
    width: '100%',
    height: 250,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 8,
    borderRadius: 20,
    zIndex: 1,
  },
  contentContainer: {
    padding: 20,
    marginTop: -20,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
    marginBottom: 12,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  tag: {
    backgroundColor: colors.primary,
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 15,
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
    lineHeight: 22,
    marginBottom: 24,
  },
  progressContainer: {
    marginTop: 16,
    marginBottom: 24,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 4,
  },
  raisedText: {
    fontSize: fonts.sizes.body,
    fontWeight: fonts.weights.bold,
    color: colors.primary,
  },
  goalText: {
    fontSize: fonts.sizes.body,
    color: colors.textLight,
  },
  cancelText: {
    fontSize: 16,
    marginLeft: 6,
    fontWeight: '600',
    color: '#333',
  },
});