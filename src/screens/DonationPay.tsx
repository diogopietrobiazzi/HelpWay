import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Platform,
  Alert,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../styles/DonationPay';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import { useAuth } from '../context/AuthContext';

type Props = NativeStackScreenProps<RootStackParamList, 'DonationPay'>;

const DonationPay: React.FC<Props> = ({ navigation, route }) => {
  const { donation } = route.params;
  const { user } = useAuth();

  const [fullName, setFullName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('5,00');

  useEffect(() => {
    if (user) {
      setFullName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const handleDonate = () => {
    const valorNumerico = parseFloat(amount.replace(',', '.'));
    if (isNaN(valorNumerico) || valorNumerico < 5) {
      Alert.alert('Valor inválido', 'A doação mínima é de R$ 5,00.');
      return;
    }

    navigation.navigate('DonationPix', {
      donationId: donation.id,
      donationAmount: amount.replace(',', '.'),
      donationName: donation.title,
});

  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#fff"
        translucent={false}
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : StatusBar.currentHeight || 0}
      >
        <ScrollView contentContainerStyle={styles.container}>
          {/* Botão de Voltar */}
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginBottom: 20, flexDirection: 'row', alignItems: 'center' }}
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
            <Text style={[styles.cancelText, { marginLeft: 5 }]}>Voltar</Text>
          </TouchableOpacity>

          {/* Nome da Organização */}
          <View style={styles.logoContainer}>
            <View style={styles.logoWrapper}>
              <View style={styles.redLogo}>
                <Text style={styles.logoSymbol}>≡</Text>
              </View>
              <Text style={styles.organizationName}>{donation.title.toUpperCase()}</Text>
            </View>
          </View>

          {/* Valor da Doação */}
          <View style={styles.amountContainer}>
            <Text style={styles.currencySymbol}>R$</Text>
            <TextInput
              style={styles.amountInput}
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              placeholder="Digite o valor"
              placeholderTextColor="#999"
            />
          </View>

          <Text style={styles.minimumDonation}>DOAÇÃO MÍNIMA DE R$ 5,00</Text>

          {/* Formulário */}
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="NOME COMPLETO"
                placeholderTextColor="#999"
                value={fullName}
                onChangeText={setFullName}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="CPF"
                placeholderTextColor="#999"
                value={cpf}
                onChangeText={setCpf}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="EMAIL"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Botão de Doar */}
          <TouchableOpacity style={styles.donateButton} onPress={handleDonate}>
            <Text style={styles.donateButtonText}>DOAR AGORA</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default DonationPay;
