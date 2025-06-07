import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import PrimaryButton from '../components/PrimaryButton';
import ProgressBar from '../components/ProgressBar';
import styles from '../styles/donationDetail';
import { Ionicons } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'DonationDetail'>;

export default function DonationDetailScreen({ route, navigation }: Props) {
  const { donation } = route.params;

  function handleLogin() {
  navigation.navigate('DonationPay', {
    donation,
  });
}

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginBottom: 20, flexDirection: 'row', alignItems: 'center' }}
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
            <Text style={[styles.cancelText, { marginLeft: 5 }]}>Voltar</Text>
          </TouchableOpacity>

      <Image source={{ uri: donation.imageUri }} style={styles.mainImage} resizeMode="cover" />

      <Text style={styles.title}>{donation.title}</Text>
      <Text style={styles.subtitle}>{donation.subtitle}</Text>

      <View style={styles.tag}>
        <Text style={styles.tagText}>PONTO DE COLETA</Text>
      </View>

      <Text style={styles.description}>{donation.description}</Text>

      <PrimaryButton title="Doar Agora" onPress={handleLogin} />

      <View style={styles.progressContainer}>
        <ProgressBar progress={donation.raised / donation.goal} />
        <Text style={styles.progressText}>
          R$ {donation.raised.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} de R$ {donation.goal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </Text>
      </View>
    </ScrollView>
  );
}
