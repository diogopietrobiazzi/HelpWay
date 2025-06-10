import React, { useState } from 'react';
import {  View,  Text, Image,  TouchableOpacity,  SafeAreaView,  StatusBar,  Clipboard,  Alert,  ScrollView,  ActivityIndicator,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import  styles  from '../styles/DonationPix';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { api } from '../services/api';

type Props = NativeStackScreenProps<RootStackParamList, 'DonationPix'>;

const DonationPix: React.FC<Props> = ({ route, navigation }) => {
  const { donationId, donationAmount, donationName } = route.params;
  const insets = useSafeAreaInsets();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pixCode = '00020126360014br.gov.bcb.pix0114+5511999999999520400005303986540510.005802BR5925Fulano de Tal6009SAO PAULO62070503***6304E3E7';

  const handleCopyCode = () => {
    Clipboard.setString(pixCode);
    Alert.alert('Código Copiado!', 'O código PIX foi copiado para sua área de transferência.');
  };

  const handleConfirmDonation = async () => {
    setIsSubmitting(true);
    const parsedAmount = parseFloat(donationAmount);

    try {
      const currentDonation = await api.getDonationById(Number(donationId));
      const newRaisedAmount = currentDonation.valor_levantado + parsedAmount;

      await api.updateDonation(Number(donationId), {
        valor_levantado: newRaisedAmount,
      });

      Alert.alert(
        'Doação Registrada!',
        'Muito obrigado pela sua contribuição. Sua ajuda faz a diferença.',
        [
          { text: 'OK', onPress: () => navigation.navigate('SearchDonation') }
        ]
      );

    } catch (error: any) {
      console.error('Erro ao confirmar doação:', error);
      Alert.alert('Erro', error.message || 'Não foi possível registrar a doação. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formattedAmount = (parseFloat(donationAmount) || 0).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
  });

  return (
    <SafeAreaView style={[styles.safeArea, { paddingTop: insets.top, paddingBottom: 0 }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#F2F5FA" />
      
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Pague com Pix para ajudar</Text>
        <Text style={styles.subtitle}>{donationName}</Text>
        <Text style={styles.amountText}>R$ {formattedAmount}</Text>
        
        <View style={styles.card}>
          <Image
            source={require('../../assets/qr-code.png')}
            style={styles.qrCode}
            resizeMode="contain"
          />
          <Text style={styles.instructionsTitle}>Ou use o Copia e Cola</Text>
          <TouchableOpacity style={styles.copyButton} onPress={handleCopyCode}>
            <Ionicons name="copy-outline" size={18} color="#475569" />
            <Text style={styles.copyButtonText}>COPIAR CÓDIGO PIX</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.instructionsTitle}>Instruções</Text>
        <Text style={styles.instructionText}>1. Abra o app do seu banco e acesse a área Pix.</Text>
        <Text style={styles.instructionText}>2. Escolha a opção "Pix Copia e Cola" ou "Ler QR Code".</Text>
        <Text style={styles.instructionText}>3. Após pagar, clique no botão abaixo para confirmar.</Text>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom > 0 ? insets.bottom : 20 }]}>
        <TouchableOpacity 
          style={[styles.confirmButton, isSubmitting && styles.confirmButtonDisabled]} 
          onPress={handleConfirmDonation}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.confirmButtonText}>JÁ FIZ O PAGAMENTO</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DonationPix;