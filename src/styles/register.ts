// styles/register.ts
import { StyleSheet } from 'react-native';
import { colors, fonts } from './index';

export default StyleSheet.create({
  flex1: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  title: {
    fontSize: fonts.sizes.h1,
    fontWeight: fonts.weights.bold,
    color: colors.primary,
    textAlign: 'center',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 1,
    gap: 40,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginTop: 20,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: -8,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  imagePlaceholderText: {
    color: '#888',
  },
  subTitle: {
  fontSize: 16,
  color: colors.text,
  textAlign: 'center',
  marginBottom: 10,
  fontWeight: '500',
},

toggleUniqueButton: {
  alignSelf: 'center',
  backgroundColor: colors.primary,
  paddingVertical: 10,
  paddingHorizontal: 30,
  borderRadius: 20,
  marginBottom: 20,
},

toggleUniqueButtonText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
},

});
