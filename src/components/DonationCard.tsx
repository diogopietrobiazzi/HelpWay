import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import ProgressBar from './ProgressBar';

type Props = {
  imageUri: string;
  title: string;
  subtitle: string;
  raised: number;
  goal: number;
};

export default function DonationCard({ imageUri, title, subtitle, raised, goal }: Props) {
  const pct = Math.min(1, raised / goal);

  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Image
            source={require('../../assets/msf-logo.png')}
            style={styles.logo}
            resizeMode="contain"
            />
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
          </View>
        </View>
        <ProgressBar progress={pct} />
        <Text style={styles.amount}>
          {`${Math.round(pct * 100)}%   R$ ${raised.toLocaleString('pt-BR')} de R$ ${goal.toLocaleString('pt-BR')}`}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 8,
    overflow: 'hidden',
    elevation: 3,
  },
  image: { width: '100%', height: 150 },
  content: { padding: 12 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  logo: { width: 40, height: 40, marginRight: 8 },
  title: { fontWeight: 'bold', fontSize: 14 },
  subtitle: { fontSize: 12, color: '#555', marginTop: 2 },
  amount: { fontSize: 12, color: '#333', marginTop: 4 },
});
