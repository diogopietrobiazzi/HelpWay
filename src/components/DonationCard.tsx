// src/components/DonationCard.tsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

interface Props {
  imageUri: string;
  title: string;
  subtitle?: string;
  raised: number;
  goal: number;
  types: string[];
}

export default function DonationCard({ imageUri, title, subtitle, raised, goal, types }: Props) {
  const percentage = Math.min((raised / goal) * 100, 100);

  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}

        <View style={styles.progressContainer}>
          <Slider
            value={percentage}
            minimumValue={0}
            maximumValue={100}
            disabled
            style={styles.slider}
            minimumTrackTintColor="#2D4BFF"
            maximumTrackTintColor="#ccc"
            thumbTintColor="#2D4BFF"
          />
          <Text style={styles.percentage}>{Math.round(percentage)}%</Text>
        </View>
        <Text style={styles.values}>R$ {raised} / R$ {goal}</Text>

        <View style={styles.typesContainer}>
          {types.map((type, idx) => (
            <View key={idx} style={styles.typeBadge}>
              <Text style={styles.typeText}>{type}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 25,
    marginVertical: 12, 
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 6, 
  },
  image: {
    width: '100%',
    height: 80, 
  },
  content: {
    padding: 10, 
  },
  title: {
    fontSize: 14, 
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  slider: {
    flex: 1,
    height: 16,
  },
  percentage: {
    marginLeft: 6,
    fontSize: 12,
    fontWeight: 'bold',
  },
  values: {
    marginTop: 4,
    fontSize: 11,
    color: '#777',
  },
  typesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  typeBadge: {
    backgroundColor: '#E0E7FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 14,
    marginRight: 4,
    marginTop: 4,
  },
  typeText: {
    fontSize: 11,
    color: '#2D4BFF',
    fontWeight: '600',
  },
});
