import { StyleSheet } from 'react-native';
import { colors, fonts } from './index';

export default StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginTop: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: fonts.sizes.h1,
    fontWeight: fonts.weights.bold,
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 20,
  },
  imagePicker: {
    alignSelf: 'center',
    backgroundColor: '#eee',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  imagePickerText: {
    color: '#888',
  },
  imagePreview: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: fonts.weights.medium,
    color: colors.text,
    marginVertical: 10,
  },
  typeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 15,
  },
  typeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: colors.card,
  },
  typeButtonActive: {
    backgroundColor: colors.primary,
  },
  typeText: {
    color: '#black',
    fontWeight: 'bold',
  },
  locationButton: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 10,
    marginVertical: 15,
  },
  locationButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: fonts.weights.medium,
  },
  submitButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: fonts.weights.bold,
  },
});
