import { StyleSheet, Dimensions, Platform } from 'react-native';
import { colors, fonts, globals } from './index';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  mockStatusBar: {
    height: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  timeText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  statusIcons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: 80,
  },
  statusIconText: {
    marginLeft: 5,
    fontSize: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? 10 : 0,
    marginBottom: 40,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 16,
    color: '#000000',
    marginLeft: 8,
    fontWeight: '500',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  redLogo: {
    width: 50,
    height: 50,
    backgroundColor: '#E53935',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  logoSymbol: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    transform: [{ rotate: '15deg' }],
  },
  organizationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A4A4A',
    lineHeight: 22,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 15,
    marginBottom: 8,
  },
  currencySymbol: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginRight: 8,
  },
  amountText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4A4A4A',
  },
  minimumDonation: {
    fontSize: 12,
    color: '#9E9E9E',
    textAlign: 'center',
    marginBottom: 30,
  },
  formContainer: {
    width: '100%',
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    padding: 15,
    marginBottom: 40,
  },
  inputContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    paddingVertical: 15,
    color: '#4A4A4A',
  },
  donateButton: {
    backgroundColor: '#4F6AF6', 
    borderRadius: 30,
    paddingVertical: 18,
    alignItems: 'center',
    width: '100%',
  },
  donateButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  amountInput: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 10,
  },
});