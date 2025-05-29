import { StyleSheet } from 'react-native';
import { colors, fonts } from './index';

export default StyleSheet.create({
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
    marginBottom: 30,
    textAlign: 'center',
  },
  forgot: {
    color: colors.textLight,
    marginBottom: 20,
    marginTop: -10,
    textAlign: 'right',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  register: {
    color: colors.primary,
    fontWeight: fonts.weights.bold,
  },
  error: {
  color: 'red',
  fontSize: 12,
  marginTop: -8,
  marginBottom: 8,
  alignSelf: 'flex-start',
},
Botton2:{
  backgroundColor: 'red',
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

});
