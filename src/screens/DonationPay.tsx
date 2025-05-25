import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView,StatusBar, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../styles/DonationPay';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';

type Props = NativeStackScreenProps<RootStackParamList, 'DonationPay'>;

const DonationPay: React.FC<Props> = ({ navigation, route }) => {
  const { donation } = route.params;

  const [fullName, setFullName] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('5,00');

  const handleDonate = () => {
    navigation.replace('DonationPix', {
      donationAmount: amount,
      donationName: donation.title,
      onCancel: () => navigation.goBack(),
    });
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
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
          <Text style={styles.cancelText}>CANCELAR</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.logoContainer}>
        <View style={styles.logoWrapper}>
          <View style={styles.redLogo}>
            <Text style={styles.logoSymbol}>≡</Text>
          </View>
          <Text style={styles.organizationName}>{donation.title.toUpperCase()}</Text>
        </View>
      </View>

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

      <TouchableOpacity style={styles.donateButton} onPress={handleDonate}>
        <Text style={styles.donateButtonText}>DOAR AGORA</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default DonationPay;
