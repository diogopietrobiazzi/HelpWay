import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import PrimaryButton from '../components/PrimaryButton';
import ProgressBar from '../components/ProgressBar';
import styles from '../styles/donationDetail';

type Props = NativeStackScreenProps<RootStackParamList, 'DonationDetail'>;

export default function DonationDetailScreen({ route, navigation }: Props) {
  const { donation } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Voltar */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.back}>← VOLTAR</Text>
      </TouchableOpacity>

      <Image
        source={require('../../assets/doctors1.png')}
        style={styles.mainImage}
        resizeMode="cover"
      />


      {/* Título e subtítulo */}
      <Text style={styles.title}>{donation.title}</Text>
      <Text style={styles.subtitle}>Paraná / Dois Vizinho</Text>

      {/* Tag */}
      <View style={styles.tag}>
        <Text style={styles.tagText}>PONTO DE COLETA</Text>
      </View>

      {/* Descrição longa */}
      <Text style={styles.description}>
        Doadores Sem Fronteiras são as pessoas que fazem doações mensais e recorrentes para MSF, fundamentais para manter nosso trabalho independente de poderes políticos e econômicos. E graças a essas contribuições constantes que podemos nos planejar, agir rapidamente em situações urgentes como a guerra em Gaza e outras emergências pelo mundo. Tudo isso significa salvar vidas!
      </Text>

      {/* Botão Doar Agora */}
      <PrimaryButton title="Doar Agora" onPress={() => { /* lógica de doação */ }} />

      {/* Barra de progresso */}
      <View style={styles.progressContainer}>
        <ProgressBar progress={donation.raised / donation.goal} />
        <Text style={styles.progressText}>
          R$ {donation.raised.toLocaleString('pt-BR', { minimumFractionDigits: 2 })} de R$ {donation.goal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </Text>
      </View>
    </ScrollView>
  );
}
