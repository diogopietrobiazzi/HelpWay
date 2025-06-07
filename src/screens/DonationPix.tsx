import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Clipboard,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {styles} from '../styles/DonationPix';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { useDonations } from '../context/DonationsContext';
import { useNavigation } from '@react-navigation/native';

type Props = NativeStackScreenProps<RootStackParamList, 'DonationPix'>;

// ...importações mantidas

const DonationPix: React.FC<Props> = ({ route }) => {
  const { donationAmount = '5,00', donationName = 'MÉDICOS SEM FRONTEIRAS', donationId } = route.params;
  const navigation = useNavigation();
  const { updateDonation } = useDonations();

  const pixCode = '00020101021226830014br.gov.bcb.pix2561api.pagseguro.com/pix/v2/E';

  const handleCopyCode = () => {
    Clipboard.setString(pixCode);
    Alert.alert('Código copiado!', 'O código PIX foi copiado para a área de transferência.');
  };

  const handleConfirmDonation = () => {
    const parsedAmount = parseFloat(donationAmount.replace(',', '.'));
    if (!isNaN(parsedAmount)) {
      updateDonation(donationId, parsedAmount);
      Alert.alert('Obrigado!', 'Sua doação foi registrada com sucesso.');
      navigation.navigate('SearchDonation' as never);
    } else {
      Alert.alert('Erro', 'Valor inválido de doação.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
          <Text style={styles.cancelText}>Voltar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.logoContainer}>
        <View style={styles.logoWrapper}>
          <Text style={styles.logoSymbol}>≡</Text>
        </View>
        <Text style={styles.organizationName}>{donationName}</Text>
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
        <Ionicons name="copy-outline" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
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

      <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmDonation}>
        <Text style={styles.confirmButtonText}>MARCAR COMO DOADO</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default DonationPix;
