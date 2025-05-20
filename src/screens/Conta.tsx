import React from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { RootStackParamList } from '../navigation';
import styles from '../styles/conta';
import TabBar from '../components/TabBar';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'Conta'>;

export default function ContaScreen() {
  const navigation = useNavigation<NavProp>();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingBottom: 100 + insets.bottom }, // espaço extra para a TabBar e barra de navegação
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Cabeçalho de perfil */}
        <View style={[styles.profileCard, { marginTop: 24 }]}>
          <Feather name="user" size={48} color="#fff" />
          <View style={styles.profileText}>
            <Text style={styles.profileName}>Aluno UTFPR</Text>
            <Text style={styles.profileEmail}>aluno@utfpr.com</Text>
          </View>
          <Feather name="edit-2" size={20} color="#fff" />
        </View>

        {/* Menu principal */}
        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem}>
            <Feather name="user" size={24} color={styles.colors.icon} />
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Minha Conta</Text>
              <Text style={styles.menuSubtitle}>Faça modificações na sua conta</Text>
            </View>
            <Feather name="chevron-right" size={20} color={styles.colors.icon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Feather name="clock" size={24} color={styles.colors.icon} />
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Histórico de Doações</Text>
              <Text style={styles.menuSubtitle}>Veja o histórico de doações</Text>
            </View>
            <Feather name="chevron-right" size={20} color={styles.colors.icon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Feather name="award" size={24} color={styles.colors.icon} />
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Certificados</Text>
              <Text style={styles.menuSubtitle}>Veja os certificados de doações</Text>
            </View>
            <Feather name="chevron-right" size={20} color={styles.colors.icon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Feather name="log-out" size={24} color={styles.colors.icon} />
            <Text style={[styles.menuTitle, { flex: 1 }]}>Sair da Conta</Text>
            <Feather name="chevron-right" size={20} color={styles.colors.icon} />
          </TouchableOpacity>
        </View>

        {/* Seção Mais */}
        <Text style={styles.sectionHeader}>Mais</Text>
        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('AddDonation')}>
            <Feather name="plus-circle" size={24} color={styles.colors.icon} />
            <Text style={[styles.menuTitle, { marginLeft: 12 }]}>Adicionar Doação</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* TabBar fixa acima da barra do sistema */}
      <View style={{ paddingBottom: insets.bottom }}>
        <TabBar
          tabs={[
            { icon: 'search', label: 'DESCUBRA', onPress: () => navigation.navigate('SearchDonation') },
            { icon: 'map-pin', label: 'MAPA', onPress: () => navigation.navigate('SearchDonation') },
            { icon: 'user', label: 'CONTA', onPress: () => {} },
          ]}
        />
      </View>
    </SafeAreaView>
  );
}
