// src/components/DonationCard.tsx

import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

type Props = {
  imageUri: string;
  title: string;
  subtitle?: string;
  raised: number;
  goal: number;
};

const DonationCard: React.FC<Props> = ({ imageUri, title, subtitle, raised, goal }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        <Text style={styles.progress}>
          R$ {raised} de R$ {goal}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  info: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  progress: {
    fontSize: 12,
    marginTop: 4,
    color: '#2D4BFF',
  },
});

export default DonationCard;
