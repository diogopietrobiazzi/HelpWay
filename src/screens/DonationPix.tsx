import React from 'react';
import {View, Text, Image, TouchableOpacity, SafeAreaView,StatusBar, Platform, Clipboard, Alert} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/DonationPix';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'DonationPix'>;

const DonationPix: React.FC<Props> = ({ route }) => {
  const { donationAmount = '5,00', donationName = 'MÉDICOS SEM FRONTEIRAS', onCancel } = route.params;

  const pixCode = '00020101021226830014br.gov.bcb.pix2561api.pagseguro.com/pix/v2/E';

  const handleCopyCode = () => {
    Clipboard.setString(pixCode);
    Alert.alert('Código copiado!', 'O código PIX foi copiado para a área de transferência.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {Platform.OS === 'ios' && (
        <View style={styles.mockStatusBar}>
          <Text style={styles.timeText}>9:41</Text>
          <View style={styles.statusIcons}>
            <Text style={styles.statusIconText}>•••</Text>
            <Text style={styles.statusIconText}>Wi-Fi</Text>
            <Text style={styles.statusIconText}>100%</Text>
          </View>
        </View>
      )}

      <View style={styles.header}>
        <TouchableOpacity onPress={onCancel} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
          <Text style={styles.cancelText}>CANCELAR</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.logoContainer}>
        <View style={styles.logoWrapper}>
          <View style={styles.redLogo}>
            <Text style={styles.logoSymbol}>≡</Text>
          </View>
          <Text style={styles.organizationName}>MÉDICOS SEM{'\n'}FRONTEIRAS</Text>
        </View>
      </View>

      <View style={styles.amountContainer}>
        <Text style={styles.currencySymbol}>R$</Text>
        <Text style={styles.amountText}>{donationAmount}</Text>
      </View>

      <View style={styles.qrCodeContainer}>
        <Image
          source={require('../../assets/qr-code.png')}
          style={styles.qrCode}
          resizeMode="contain"
        />
      </View>

      <TouchableOpacity style={styles.copyButton} onPress={handleCopyCode}>
        <Ionicons name="copy-outline" size={20} color="#FFFFFF" />
        <Text style={styles.copyButtonText}>COPIAR CÓDIGO</Text>
      </TouchableOpacity>

      <View style={styles.pixCodeContainer}>
        <Text style={styles.pixCodeText}>{pixCode}</Text>
      </View>

      <View style={styles.instructionsContainer}>
        <Text style={styles.instructionText}>1. Acesse o aplicativo do seu banco.</Text>
        <Text style={styles.instructionText}>2. Escolha pagar com Pix Copia e Cola.</Text>
        <Text style={styles.instructionText}>3. Copie e cole o código e confirme o pagamento.</Text>
      </View>

      <TouchableOpacity style={styles.helpContainer}>
        <Text style={styles.helpText}>ajuda!</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default DonationPix;
