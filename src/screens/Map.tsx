import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import TabBar from '../components/TabBar';
import { styles } from '../styles/map';

import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';
import type { LocationObjectCoords } from 'expo-location';

const Map = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [location, setLocation] = useState<LocationObjectCoords | null>(null);
  const [region, setRegion] = useState<Region | null>(null);

  const donations = [
    {
      id: 1,
      name: 'MÉDICOS SEM FRONTEIRAS',
      latitude: -25.7365,
      longitude: -53.0571,
      distance: '420M',
    },
    {
      id: 2,
      name: 'AÇÃOCHEGO',
      latitude: -25.738,
      longitude: -53.058,
      distance: '700M',
    },
  ];

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      let loc = await Location.getCurrentPositionAsync({});
      const coords = {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };

      setLocation(loc.coords);
      setRegion(coords);
    })();
  }, []);

  if (!region) {
    return <Text style={{ padding: 20 }}>Carregando mapa...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>4 Lugares próximo</Text>
      </View>

      <MapView style={styles.map} region={region} showsUserLocation>
        {donations.map(donation => (
          <Marker
            key={donation.id}
            coordinate={{
              latitude: donation.latitude,
              longitude: donation.longitude,
            }}
            title={donation.name}
          />
        ))}
      </MapView>

      <View style={styles.cardsContainer}>
        {donations.map(d => (
          <View key={d.id} style={styles.card}>
            <Text style={styles.cardTitle}>{d.name}</Text>
            <Text style={styles.cardSubtitle}>{d.distance}</Text>
          </View>
        ))}
      </View>

      <TabBar
        tabs={[
          { icon: 'search', label: 'DESCUBRA', onPress: () => navigation.navigate('SearchDonation') },
          { icon: 'map-pin', label: 'MAPA', onPress: () => {} },
          { icon: 'user', label: 'CONTA', onPress: () => navigation.navigate('Conta') },
        ]}
      />
    </View>
  );
};

export default Map;
