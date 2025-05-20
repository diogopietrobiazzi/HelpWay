// src/screens/AddDonationScreen.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Button, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import Input from '../components/Input';
import { useDonations, Donation } from '../context/DonationsContext';
import { RootStackParamList } from '../navigation';
import { colors } from '../styles';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'AddDonation'>;

export default function AddDonationScreen() {
  const { addDonation } = useDonations();
  const navigation = useNavigation<NavProp>();

  const [title, setTitle] = useState('');
  const [need, setNeed] = useState('');
  const [responsible, setResponsible] = useState('');
  const [types, setTypes] = useState<string[]>([]);

  function toggleType(type: string) {
    setTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  }

  function handleSubmit() {
    const newDonation: Omit<Donation, 'id'> = {
      title,
      subtitle: responsible,
      raised: 0,
      goal: Number(need),
      imageSource: require('../../assets/doctors1.png'),
    };
    // opcionalmente passar types em DonationType
    addDonation(newDonation);
    navigation.goBack();
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Input
        icon="gift-outline"
        placeholder="Título da campanha"
        value={title}
        onChangeText={setTitle}
      />

      <Input
        icon="pricetag-outline"
        placeholder="Necessidade (valor/qtd)"
        keyboardType="numeric"
        value={need}
        onChangeText={setNeed}
      />

      <Text style={styles.label}>Tipo de doação</Text>
      {['Dinheiro', 'Alimentação', 'Utensílios/Vestimenta'].map(type => (
        <TouchableOpacity
          key={type}
          style={[
            styles.typeButton,
            types.includes(type) && styles.typeButtonActive,
          ]}
          onPress={() => toggleType(type)}
        >
          <Text
            style={[
              styles.typeText,
              types.includes(type) && { color: colors.card },
            ]}
          >
            {type}
          </Text>
        </TouchableOpacity>
      ))}

      <Input
        icon="person-circle-outline"
        placeholder="Responsável (nome e cargo)"
        value={responsible}
        onChangeText={setResponsible}
      />

      <Button title="Criar Doação" onPress={handleSubmit} color={colors.primary} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.background,
  },
  label: {
    marginTop: 12,
    fontSize: 14,
    color: colors.text,
  },
  typeButton: {
    padding: 10,
    marginTop: 8,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 6,
  },
  typeButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  typeText: {
    textAlign: 'center',
    color: colors.text,
  },
});
