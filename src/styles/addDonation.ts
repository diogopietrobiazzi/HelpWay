import { StyleSheet } from 'react-native';
import { colors, fonts } from './index';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  label: {
    marginTop: 12,
    fontSize: fonts.sizes.body,
    color: colors.text,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
    padding: 8,
    marginTop: 4,
    fontSize: fonts.sizes.body,
    color: colors.text,
    backgroundColor: '#fff',
  },
  imagePicker: {
    marginVertical: 12,
    padding: 12,
    alignItems: 'center',
    borderRadius: 6,
  },
  imagePickerText: {
    color: colors.textLight,
    fontSize: fonts.sizes.body,
  },
});
