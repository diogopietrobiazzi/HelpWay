import React from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';

import { RootStackParamList } from '../navigation';
import styles from '../styles/conta';
import TabBar from '../components/TabBar';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'Conta'>;

export default function ContaScreen() {
  const navigation = useNavigation<NavProp>();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Cabeçalho de perfil */}
        <View style={styles.profileCard}>
          <Feather name="user" size={48} color="#fff" />
          <View style={styles.profileText}>
            <Text style={styles.profileName}>Aluno UTFPR</Text>
            <Text style={styles.profileEmail}>aluno@utfpr.com</Text>
          </View>
          <Feather name="edit-2" size={20} color="#fff" />
        </View>

        {/* Menu principal */}
        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem} onPress={() => {/* editar conta */}}>
            <Feather name="user" size={24} color={styles.colors.icon} />
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Minha Conta</Text>
              <Text style={styles.menuSubtitle}>Faça modificações na sua conta</Text>
            </View>
            <Feather name="chevron-right" size={20} color={styles.colors.icon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => {/* histórico */}}>
            <Feather name="clock" size={24} color={styles.colors.icon} />
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Histórico de Doações</Text>
              <Text style={styles.menuSubtitle}>Veja o histórico de doações</Text>
            </View>
            <Feather name="chevron-right" size={20} color={styles.colors.icon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => {/* certificados */}}>
            <Feather name="award" size={24} color={styles.colors.icon} />
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Certificados</Text>
              <Text style={styles.menuSubtitle}>Veja os certificados de doações</Text>
            </View>
            <Feather name="chevron-right" size={20} color={styles.colors.icon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => {/* sair */}}>
            <Feather name="log-out" size={24} color={styles.colors.icon} />
            <Text style={[styles.menuTitle, { flex: 1 }]}>Sair da Conta</Text>
            <Feather name="chevron-right" size={20} color={styles.colors.icon} />
          </TouchableOpacity>
        </View>

        {/* Seção Mais */}
        <Text style={styles.sectionHeader}>Mais</Text>
        <View style={styles.menuSection}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('AddDonation')}
          >
            <Feather name="plus-circle" size={24} color={styles.colors.icon} />
            <Text style={[styles.menuTitle, { marginLeft: 12 }]}>
              Adicionar Doação
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* TabBar no rodapé */}
      <TabBar
        tabs={[
          { icon: 'search', label: 'DESCUBRA', onPress: () => navigation.navigate('SearchDonation') },
          { icon: 'map-pin', label: 'MAPA', onPress: () => navigation.navigate('SearchDonation') },
          { icon: 'user', label: 'CONTA', onPress: () => {} },
        ]}
      />
    </SafeAreaView>
);
}
