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
    marginBottom: 20,
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
    marginBottom: 20,
  },
  logoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  redLogo: {
    width: 40,
    height: 40,
    backgroundColor: '#E53935',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  logoSymbol: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    transform: [{ rotate: '15deg' }],
  },
  organizationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A4A4A',
    lineHeight: 20,
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    alignSelf: 'center',
    width: '80%',
  },
  currencySymbol: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginRight: 8,
  },
  amountText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A4A4A',
  },
  qrCodeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  qrCode: {
    width: 200,
    height: 200,
  },
  copyButton: {
    backgroundColor: '#4F6AF6',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 20,
  },
  copyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  pixCodeContainer: {
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  pixCodeText: {
    fontSize: 12,
    color: '#4A4A4A',
    textAlign: 'center',
  },
  instructionsContainer: {
    marginBottom: 20,
  },
  instructionText: {
    fontSize: 14,
    color: '#4A4A4A',
    marginBottom: 5,
  },
  helpContainer: {
    alignItems: 'center',
  },
  helpText: {
    fontSize: 14,
    color: '#4A4A4A',
  },
});