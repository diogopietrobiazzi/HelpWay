// src/screens/SearchDonationScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import * as NavigationBar from 'expo-navigation-bar';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import SearchBar from '../components/SearchBar';
import FilterButton from '../components/FilterButton';
import PrimaryButton from '../components/PrimaryButton';
import SegmentControl from '../components/SegmentControl';
import DonationCard from '../components/DonationCard';
import TabBar from '../components/TabBar';

import { globals } from '../styles';
import searchStyles from '../styles/searchDonation';
import { useDonations, Donation } from '../context/DonationsContext';
import { RootStackParamList } from '../navigation';

// Tipagem para navigation
type NavProp = NativeStackNavigationProp<RootStackParamList, 'SearchDonation'>;

export default function SearchDonationScreen() {
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'REGIONAL' | 'NACIONAL' | 'MUNDIAL'>('REGIONAL');
  const navigation = useNavigation<NavProp>();
  const { donations } = useDonations();

  useEffect(() => {
    StatusBar.setHidden(true);
    if (Platform.OS === 'android') {
      NavigationBar.setVisibilityAsync('hidden');
      NavigationBar.setBackgroundColorAsync('#2D4BFF');
    }
  }, []);

function renderItem({ item }: { item: Donation }) {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('DonationDetail', { donation: item })
      }
    >
      <DonationCard
        imageUri={item.imageUri} // <-- Corrigido aqui
        title={item.title}
        subtitle={item.subtitle}
        raised={item.raised}
        goal={item.goal}
      />
    </TouchableOpacity>
  );
}


  return (
    <SafeAreaView style={[globals.container, { paddingTop: insets.top }]}>
      <KeyboardAvoidingView
        style={searchStyles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Cabeçalho de busca */}
        <View style={searchStyles.searchRow}>
          <SearchBar value={search} onChangeText={setSearch} />
          <FilterButton onPress={() => {}} />
        </View>

        {/* Cartão principal */}
        <View style={searchStyles.card}>
          {/* Linha 51 corrigida: PrimaryButton corretamente importado e utilizado */}
          <PrimaryButton title="Doar Agora" onPress={() => {}} />
          <View style={searchStyles.cardContent}>
            <Text style={searchStyles.heading}>Lorem ipsum</Text>
            <Text style={searchStyles.desc}>
              Lorem ipsum dolor sit amet. Non saepe voluptas ex repellendus
              blanditiis in dolorem dolore ea autem illum qui cumque Quis et
              minus possimus. Aut labore placeat est omnis maxime aut totam
              sint.
            </Text>
          </View>
        </View>

        {/* Segment Control */}
        <SegmentControl
          options={['REGIONAL', 'NACIONAL', 'MUNDIAL']}
          selected={filter}
          onSelect={(value) => setFilter(value as any)}
        />

        {/* Lista de doações */}
        {/* Linha 54 corrigida: FlatList recebe corretamente renderItem */}
        <FlatList
          data={donations}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={searchStyles.listContent}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
        />

        {/* TabBar */}
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
              onPress: () => navigation.navigate('Map'),
            },
            {
              icon: 'user',
              label: 'CONTA',
              onPress: () => navigation.navigate('Conta'),
            },
          ]}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}