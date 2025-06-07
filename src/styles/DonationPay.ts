import { StyleSheet, Dimensions, Platform } from 'react-native';
import { colors, fonts, globals } from './index'; // Se ainda quiser usar

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F2F5FA',
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? 10 : 0,
    marginBottom: 20,
  },

  cancelText: {
    fontSize: 16,
    marginLeft: 6,
    fontWeight: '600',
    color: '#333',
  },

  pageTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#888',
    letterSpacing: 1,
  },

  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },

  organizationName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222',
    marginTop: 4,
    textAlign: 'center',
  },

  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },

  currencySymbol: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginRight: 6,
  },

  amountInput: {
    fontSize: 26,
    fontWeight: '600',
    color: '#000',
    flex: 1,
    textAlign: 'left',
  },

  minimumDonation: {
    fontSize: 13,
    textAlign: 'center',
    color: '#777',
    marginBottom: 30,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },

  formContainer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 1,
  },

  inputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginBottom: 20,
  },

  input: {
    fontSize: 16,
    paddingVertical: 12,
    color: '#333',
  },

  donateButton: {
    backgroundColor: '#4F6AF6',
    borderRadius: 30,
    paddingVertical: 18,
    alignItems: 'center',
    width: '100%',
  },

  donateButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
    redLogo: {
    width: 54,
    height: 54,
    backgroundColor: '#E53935',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },

  logoSymbol: {
    color: '#FFF',
    fontSize: 26,
    fontWeight: 'bold',
    transform: [{ rotate: '15deg' }],
  },
    logoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});