import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { RootStackParamList } from '../navigation';
import styles from '../styles/conta';
import { colors } from '../styles';
import TabBar from '../components/TabBar';
import { useAuth } from '../context/AuthContext';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'Conta'>;

export default function ContaScreen() {
  const navigation = useNavigation<NavProp>();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.scroll,
          { paddingBottom: 100 + insets.bottom },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.profileCard, { marginTop: 24 }]}>
          {user?.img_usuario ? (
            <Image source={{ uri: user.img_usuario }} style={styles.profileImage} />
          ) : (
            <Feather name="user" size={48} color="#fff" />
          )}
          <View style={styles.profileText}>
            <Text style={styles.profileName}>{user?.nome}</Text>
          </View>
        </View>

        <View style={styles.menuSection}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('AlterarDados')}
          >
            <Feather name="user" size={24} color={colors.primary} />
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Minha Conta</Text>
            </View>
            <Feather name="chevron-right" size={20} color={colors.primary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Feather name="clock" size={24} color={colors.primary} />
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Histórico de Doações</Text>
            </View>
            <Feather name="chevron-right" size={20} color={colors.primary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <Feather name="award" size={24} color={colors.primary} />
            <View style={styles.menuTextContainer}>
              <Text style={styles.menuTitle}>Certificados</Text>
            </View>
            <Feather name="chevron-right" size={20} color={colors.primary} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate('Login')}
          >
            <Feather name="log-out" size={24} color={colors.primary} />
            <Text style={[styles.menuTitle, { flex: 1 }, { marginHorizontal: 12 }]}>
              Sair da Conta
            </Text>
            <Feather name="chevron-right" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {user?.tp_usuario === 2 && (
          <>
            <Text style={styles.sectionHeader}>DOADOR</Text>
            <View style={styles.menuSection}>
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => navigation.navigate('AddDonation')}
              >
                <Feather name="plus-circle" size={24} color={colors.primary} />
                <Text style={[styles.menuTitle, { marginLeft: 12 }]}>
                  Adicionar Doação
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>

      <View style={{ paddingBottom: insets.bottom }}>
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
              onPress: () => {},
            },
          ]}
        />
      </View>
    </SafeAreaView>
  );
}
