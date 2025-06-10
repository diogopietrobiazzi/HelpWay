import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import MapView, { Marker, Region, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import TabBar from '../components/TabBar';
import { styles } from '../styles/map';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';
import type { LocationObjectCoords } from 'expo-location';
import { api } from '../services/api';

type ApiDonation = {
  id: string;
  title: string;
  location: { latitude: number; longitude: number };
};

type DonationWithDistance = ApiDonation & { distance?: string };

const getDistanceFromLatLonInKm = (
  lat1: number, lon1: number, lat2: number, lon2: number
) => {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export default function Map() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'Map'>>();
  const onLocationSelected = route.params?.onLocationSelected;
  const insets = useSafeAreaInsets();

  const mapRef = useRef<MapView>(null);

  const [location, setLocation] = useState<LocationObjectCoords | null>(null);
  const [region, setRegion] = useState<Region | null>(null);
  const [apiDonations, setApiDonations] = useState<ApiDonation[]>([]);
  const [donationsWithDistance, setDonationsWithDistance] = useState<DonationWithDistance[]>([]);
  const [routeCoords, setRouteCoords] = useState<{ latitude: number; longitude: number }[]>([]);
  const [activeRouteDonationId, setActiveRouteDonationId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Precisamos da permissão para acessar sua localização.');
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
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
    const fetchDonations = async () => {
      try {
        const dataFromApi = await api.getDonations();
        const donationsWithLocation = dataFromApi.filter((d: any) => d.localizacao);
        
        const formattedData: ApiDonation[] = donationsWithLocation.map((d: any) => ({
          id: String(d.id),
          title: d.titulo,
          location: {
            latitude: d.localizacao.latitude,
            longitude: d.localizacao.longitude,
          },
        }));
        
        setApiDonations(formattedData);
      } catch (err: any) {
        console.error(err);
        Alert.alert('Erro', 'Não foi possível carregar as doações.');
      }
    };
    fetchDonations();
  }, []);

  useEffect(() => {
    if (location && apiDonations.length) {
      const updated = apiDonations.map(d => {
        const distKm = getDistanceFromLatLonInKm(
          location.latitude, location.longitude,
          d.location.latitude, d.location.longitude
        );
        return { ...d, distance: `${distKm.toFixed(2)} km` };
      });
      setDonationsWithDistance(updated.sort((a, b) => parseFloat(a.distance!) - parseFloat(b.distance!)));
    }
  }, [location, apiDonations]);

  const handleDrawRoute = async (d: DonationWithDistance) => {
    if (!location) return;
    if (activeRouteDonationId === d.id) {
      setRouteCoords([]);
      setActiveRouteDonationId(null);
      return;
    }

    try {
        const url = `http://router.project-osrm.org/route/v1/driving/` +
        `${location.longitude},${location.latitude};` +
        `${d.location.longitude},${d.location.latitude}?overview=full&geometries=geojson`;
        
        const resp = await fetch(url);
        const json = await resp.json();
        
        if (json.routes && json.routes.length > 0) {
            const coords = json.routes[0].geometry.coordinates.map(([lng, lat]: [number, number]) => ({
                latitude: lat, longitude: lng
            }));
            setRouteCoords(coords);
            setActiveRouteDonationId(d.id);
            mapRef.current?.fitToCoordinates(coords, {
                edgePadding: { top: 100, bottom: 250, left: 50, right: 50 },
                animated: true,
            });
        } else {
            Alert.alert('Erro de Rota', 'Não foi possível calcular a rota para este destino.');
        }
    } catch(error) {
        Alert.alert('Erro de Rota', 'Não foi possível conectar ao serviço de rotas.');
        console.error(error);
    }
  };

  const handleGoToLocation = (loc: { latitude: number; longitude: number }) => {
    mapRef.current?.animateToRegion({ ...loc, latitudeDelta: 0.005, longitudeDelta: 0.005 });
  };
  
  const handleRecenter = () => {
    if (location && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  };

  if (!region) {
    return (
        <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Carregando mapa e localização...</Text>
        </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={region}
        showsUserLocation
        onPress={e => {
          if (onLocationSelected) {
            const coords = e.nativeEvent.coordinate;
            onLocationSelected({ ...coords, accuracy: null, altitude: null, heading: null, speed: null, altitudeAccuracy: null });
            navigation.goBack();
          }
        }}
      >
        {donationsWithDistance.map(d => (
          <Marker
            key={d.id}
            coordinate={d.location}
            title={d.title}
            pinColor={activeRouteDonationId === d.id ? 'tomato' : 'indigo'}
          />
        ))}
        {routeCoords.length > 0 && <Polyline coordinates={routeCoords} strokeWidth={5} strokeColor="#4B4DED" />}
      </MapView>
      
      {!onLocationSelected && (
        <>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={[styles.cardsScrollView, { bottom: insets.bottom + 90 }]}
            contentContainerStyle={styles.cardsContainer}
          >
            {donationsWithDistance.map(d => (
              <View key={d.id} style={styles.card}>
                <Text style={styles.cardTitle} numberOfLines={2}>{d.title}</Text>
                <Text style={styles.cardSubtitle}>{d.distance}</Text>
                <View style={styles.cardButtonsContainer}>
                  <TouchableOpacity style={styles.cardButton} onPress={() => handleDrawRoute(d)}>
                    <Text style={styles.cardButtonText}>
                      {activeRouteDonationId === d.id ? 'Limpar Rota' : 'Ver Rota'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.cardButton, { backgroundColor: '#fff', borderWidth: 1, borderColor: '#4B4DED' }]}
                    onPress={() => handleGoToLocation(d.location)}
                  >
                    <Text style={[styles.cardButtonText, { color: '#4B4DED' }]}>Ir ao Local</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>

          <View style={[styles.tabBarContainer, { paddingBottom: insets.bottom }]}>
            <TabBar
              tabs={[
                { icon: 'search', label: 'DESCUBRA', onPress: () => navigation.navigate('SearchDonation') },
                { icon: 'map-pin', label: 'MAPA', onPress: () => {} },
                { icon: 'user', label: 'CONTA', onPress: () => navigation.navigate('Conta') },
              ]}
            />
          </View>
        </>
      )}
    </View>
  );
}