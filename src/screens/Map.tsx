import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import MapView, { Marker, Region, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import TabBar from '../components/TabBar';
import { styles } from '../styles/map';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';
import type { LocationObjectCoords } from 'expo-location';

import { useDonations } from '../context/DonationsContext';

const getDistanceFromLatLonInKm = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

type DonationWithDistance = {
  id: string;
  title: string;
  location: {
    latitude: number;
    longitude: number;
  };
  distance?: string;
};

const Map = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'Map'>>();
  const onLocationSelected = route.params?.onLocationSelected;

  const insets = useSafeAreaInsets();
  const { donations } = useDonations();

  const [location, setLocation] = useState<LocationObjectCoords | null>(null);
  const [region, setRegion] = useState<Region | null>(null);
  const [routeCoords, setRouteCoords] = useState<{ latitude: number; longitude: number }[]>([]);
  const [donationsWithDistance, setDonationsWithDistance] = useState<DonationWithDistance[]>([]);
  const [activeRouteDonationId, setActiveRouteDonationId] = useState<string | null>(null);
  const mapRef = useRef<MapView>(null);

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

  useEffect(() => {
    if (location) {
      const updated = donations.map((donation) => {
        const distanceKm = getDistanceFromLatLonInKm(
          location.latitude,
          location.longitude,
          donation.location.latitude,
          donation.location.longitude
        );

        return {
          ...donation,
          distance: `${distanceKm.toFixed(2)} km`,
        };
      });

      setDonationsWithDistance(updated);
    }
  }, [location, donations]);

  const handleDrawRoute = async (donation: DonationWithDistance) => {
    if (!location) return;

    if (activeRouteDonationId === donation.id) {
      setRouteCoords([]);
      setActiveRouteDonationId(null);
      return;
    }

    const url = `http://router.project-osrm.org/route/v1/driving/${location.longitude},${location.latitude};${donation.location.longitude},${donation.location.latitude}?overview=full&geometries=geojson`;
    const response = await fetch(url);
    const data = await response.json();

    const coords = data.routes[0].geometry.coordinates.map(([lng, lat]: [number, number]) => ({
      latitude: lat,
      longitude: lng,
    }));

    setRouteCoords(coords);
    setActiveRouteDonationId(donation.id);

    mapRef.current?.fitToCoordinates(coords, {
      edgePadding: { top: 100, bottom: 100, left: 50, right: 50 },
      animated: true,
    });
  };

  const handleGoToLocation = (donationLocation: { latitude: number; longitude: number }) => {
    mapRef.current?.animateToRegion({
      latitude: donationLocation.latitude,
      longitude: donationLocation.longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
  };

  if (!region) {
    return <Text style={{ padding: 20 }}>Carregando mapa...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Localizar Doações</Text>
      </View>

      <MapView
        ref={mapRef}
        style={styles.map}
        region={region}
        showsUserLocation
        onPress={(e) => {
          if (onLocationSelected) {
            const coords = e.nativeEvent.coordinate;
            const fullCoords: LocationObjectCoords = {
              ...coords,
              accuracy: 0,
              altitude: 0,
              heading: 0,
              speed: 0,
              altitudeAccuracy: 0,
            };
            onLocationSelected(fullCoords);
            navigation.goBack();
          }
        }}
      >
        {donationsWithDistance.map((donation) => (
          <Marker
            key={donation.id}
            coordinate={{
              latitude: donation.location.latitude,
              longitude: donation.location.longitude,
            }}
            title={donation.title}
          />
        ))}

        {routeCoords.length > 0 && (
          <Polyline coordinates={routeCoords} strokeWidth={5} strokeColor="red" />
        )}
      </MapView>

      {!onLocationSelected && (
        <>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cardsContainer}
          >
            {donationsWithDistance.map((d) => (
              <View key={d.id} style={styles.card}>
                <Text style={styles.cardTitle} numberOfLines={2}>
                  {d.title}
                </Text>
                <Text style={styles.cardSubtitle}>{d.distance}</Text>

                <View style={styles.cardButtonsContainer}>
                  <TouchableOpacity
                    style={styles.cardButton}
                    onPress={() => handleDrawRoute(d)}
                  >
                    <Text style={styles.cardButtonText}>
                      {activeRouteDonationId === d.id ? 'Cancelar' : 'Rota'}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.cardButton, { backgroundColor: '#fff' }]}
                    onPress={() => handleGoToLocation(d.location)}
                  >
                    <Text style={[styles.cardButtonText, { color: '#4B4DED' }]}>Ir</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>

          <View style={{ paddingBottom: insets.bottom + 10 }}>
            <TabBar
              tabs={[
                {
                  icon: 'search',
                  label: 'DESCUBRA',
                  onPress: () => navigation.navigate('SearchDonation'),
                },
                {
                  icon: 'map-pin',
                  label: 'MAPA',
                  onPress: () => {},
                },
                {
                  icon: 'user',
                  label: 'CONTA',
                  onPress: () => navigation.navigate('Conta'),
                },
              ]}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default Map;
