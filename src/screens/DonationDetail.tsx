import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import PrimaryButton from '../components/PrimaryButton';
import ProgressBar from '../components/ProgressBar';
import styles from '../styles/donationDetail';
import { Ionicons } from '@expo/vector-icons';
import { api } from '../services/api';

type Props = NativeStackScreenProps<RootStackParamList, 'DonationDetail'>;

type DonationAPI = {
  id: number;
  titulo: string;
  subtitulo: string;
  descricao: string;
  imagem_base64: string;
  meta_doacoes: number;
  valor_levantado: number;
  fg_dinheiro: boolean;
  fg_alimentacao: boolean;
  fg_vestuario: boolean;
  localizacao: {
    latitude: number;
    longitude: number;
  } | null;
};

export default function DonationDetailScreen({ route, navigation }: Props) {
  const { donation } = route.params;
  const [apiData, setApiData] = useState<DonationAPI | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDonation = async () => {
      try {
        const data = await api.getDonationById(Number(donation.id));
        setApiData(data);
      } catch (error: any) {
        console.error('Falha ao obter doação', error);
        Alert.alert('Erro', 'Não foi possível carregar os dados da doação.');
      } finally {
        setLoading(false);
      }
    };

    fetchDonation();
  }, [donation.id]);

  const handleDonate = () => {
    navigation.navigate('DonationPay', { donation });
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#4B4DED" />
      </View>
    );
  }

  if (!apiData) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ fontSize: 16, color: '#666' }}>Dados da doação indisponíveis.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 20 }}>
          <Text style={{ color: '#4B4DED' }}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const progress = apiData.meta_doacoes > 0 ? apiData.valor_levantado / apiData.meta_doacoes : 0;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {apiData.imagem_base64 ? (
        <Image
          source={{ uri: `data:image/jpeg;base64,${apiData.imagem_base64}` }}
          style={styles.mainImage}
          resizeMode="cover"
        />
      ) : (
        <View style={[styles.mainImage, { backgroundColor: '#eee' }]} />
      )}

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={28} color="white" />
      </TouchableOpacity>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>{apiData.titulo}</Text>
        <Text style={styles.subtitle}>{apiData.subtitulo}</Text>

        <View style={styles.tagContainer}>
          {apiData.fg_dinheiro && <View style={styles.tag}><Text style={styles.tagText}>DINHEIRO</Text></View>}
          {apiData.fg_alimentacao && <View style={styles.tag}><Text style={styles.tagText}>ALIMENTOS</Text></View>}
          {apiData.fg_vestuario && <View style={styles.tag}><Text style={styles.tagText}>VESTUÁRIO</Text></View>}
        </View>

        <Text style={styles.description}>{apiData.descricao}</Text>

        <View style={styles.progressContainer}>
          <View style={styles.progressInfo}>
            <Text style={styles.raisedText}>
              R$ {apiData.valor_levantado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </Text>
            <Text style={styles.goalText}>
              Arrecadado de R$ {apiData.meta_doacoes.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </Text>
          </View>
          <ProgressBar progress={progress} />
        </View>

        <PrimaryButton title="QUERO AJUDAR" onPress={handleDonate} />
      </View>
    </ScrollView>
  );
}