import { StyleSheet, Platform } from 'react-native';
import { colors, fonts } from './index';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Platform.OS === 'android' ? 10 : 0,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 6,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  logoWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E0F2F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pixIcon: {
    width: 40,
    height: 40,
  },
  organizationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 10,
    textAlign: 'center',
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: 20,
  },
  currencySymbol: {
    fontSize: 28,
    fontWeight: 'bold',
    marginRight: 4,
    color: colors.primary,
  },
  amountText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
  },
  qrCodeContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  qrCode: {
    width: 200,
    height: 200,
  },
  copyButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  copyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  pixCodeContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  pixCodeText: {
    fontSize: 12,
    color: colors.primary,
    textAlign: 'center',
  },
  instructionsContainer: {
    marginTop: 30,
    paddingHorizontal: 10,
  },
  instructionText: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 10,
  },
  bottomSpacer: {
    paddingBottom: Platform.OS === 'android' ? 30 : 20,
    marginTop: 30,
  },
  confirmButton: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoSymbol: {
    fontSize: 28,
    color: 'red',
  },
});
