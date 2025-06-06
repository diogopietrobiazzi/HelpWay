import React, { useEffect, useState } from 'react';
import {  View,  Text,  FlatList,  KeyboardAvoidingView,Platform,  StatusBar,  TouchableOpacity,  Modal,} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import * as NavigationBar from 'expo-navigation-bar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Location from 'expo-location';
import Slider from '@react-native-community/slider';

import SearchBar from '../components/SearchBar';
import FilterButton from '../components/FilterButton';
import SegmentControl from '../components/SegmentControl';
import DonationCard from '../components/DonationCard';
import TabBar from '../components/TabBar';

import searchStyles from '../styles/searchDonation';
import { useDonations, Donation } from '../context/DonationsContext';
import { RootStackParamList } from '../navigation';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'SearchDonation'>;

export default function SearchDonationScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<NavProp>();
  const { donations } = useDonations();

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'REGIONAL' | 'NACIONAL' | 'MUNDIAL'>('REGIONAL');
  const [modalVisible, setModalVisible] = useState(false);
  const [maxDistance, setMaxDistance] = useState(2000);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(20000);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  const donationTypes = ['Dinheiro', 'Alimentação', 'Utensílio'];

  useEffect(() => {
    StatusBar.setHidden(true);
    if (Platform.OS === 'android') {
      NavigationBar.setVisibilityAsync('hidden');
      NavigationBar.setBackgroundColorAsync('#2D4BFF');
    }

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        setUserLocation(location.coords);
      }
    })();
  }, []);

  function getDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  const filteredDonations = donations.filter((donation) => {
    const searchLower = search.toLowerCase();
    const matchesSearch =
      donation.title.toLowerCase().includes(searchLower) ||
      (donation.subtitle?.toLowerCase() ?? '').includes(searchLower);

    const distance =
      userLocation && donation.location
        ? getDistanceKm(
            userLocation.latitude,
            userLocation.longitude,
            donation.location.latitude,
            donation.location.longitude
          )
        : Infinity;

    const matchesFilter =
      filter === 'REGIONAL'
        ? distance <= 50
        : filter === 'NACIONAL'
        ? distance <= 1000
        : true;

    const withinDistance = distance <= maxDistance;
    const matchesPrice = donation.raised >= minValue && donation.raised <= maxValue;
    const matchesType =
      selectedTypes.length === 0 ||
      selectedTypes.some((type) => donation.types.includes(type));

    return matchesSearch && matchesFilter && withinDistance && matchesPrice && matchesType;
  });

  return (
    <SafeAreaView style={[searchStyles.container, { paddingTop: insets.top }]}>
      <KeyboardAvoidingView
        style={searchStyles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={searchStyles.searchRow}>
          <SearchBar value={search} onChangeText={setSearch} />
          <FilterButton onPress={() => setModalVisible(true)} />
        </View>

        <SegmentControl
          options={['REGIONAL', 'NACIONAL', 'MUNDIAL']}
          selected={filter}
          onSelect={(value) => setFilter(value as any)}
        />

        <FlatList
          data={filteredDonations}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={true}
          contentContainerStyle={{ paddingBottom: 120 }} 
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate('DonationDetail', { donation: item })}>
              <DonationCard
                imageUri={item.imageUri}
                title={item.title}
                subtitle={item.subtitle}
                raised={item.raised}
                goal={item.goal}
                types={item.types}
              />
            </TouchableOpacity>
          )}
        />

        <View style={searchStyles.tabBarContainer}>
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
                onPress: () => navigation.navigate('Map' as never),
              },
              {
                icon: 'user',
                label: 'CONTA',
                onPress: () => navigation.navigate('Conta'),
              },
            ]}
          />
        </View>
      </KeyboardAvoidingView>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={searchStyles.modalOverlay}>
          <View style={searchStyles.modalContent}>
            <Text style={searchStyles.modalTitle}>Distância máxima (km)</Text>
            <Slider
              minimumValue={0}
              maximumValue={2000}
              value={maxDistance}
              onValueChange={setMaxDistance}
              step={10}
              style={searchStyles.slider}
            />
            <Text style={searchStyles.distanceLabel}>{Math.round(maxDistance)} km</Text>

            <Text style={searchStyles.modalTitle}>Tipo de Doação</Text>
            {donationTypes.map((type) => (
              <TouchableOpacity
                key={type}
                onPress={() =>
                  setSelectedTypes((prev) =>
                    prev.includes(type)
                      ? prev.filter((t) => t !== type)
                      : [...prev, type]
                  )
                }
                style={[searchStyles.typeButton, selectedTypes.includes(type) && searchStyles.typeButtonSelected]}
              >
                <Text style={searchStyles.typeButtonText}>{type}</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={searchStyles.closeButton}
            >
              <Text style={searchStyles.closeText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
