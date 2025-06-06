import React, { useState } from 'react';
import {View,Text,TouchableOpacity,ScrollView,Image,KeyboardAvoidingView,Platform,TouchableWithoutFeedback,Keyboard,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';

import InputText from '../components/InputText';
import Input from '../components/Input';
import { useDonations, Donation } from '../context/DonationsContext';
import { RootStackParamList } from '../navigation';
import { colors } from '../styles';
import styles from '../styles/addDonation';
import type { LocationObjectCoords } from 'expo-location';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'AddDonation'>;

export default function AddDonationScreen() {
  const { addDonation } = useDonations();
  const navigation = useNavigation<NavProp>();

  const [title, setTitle] = useState('');
  const [need, setNeed] = useState('');
  const [responsible, setResponsible] = useState('');
  const [types, setTypes] = useState<string[]>([]);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [description, setDescription] = useState('');

  function toggleType(type: string) {
    setTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  }

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({ quality: 0.5 });
    if (!result.canceled && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  }

  function handleLocationSelect() {
    navigation.navigate('Map', {
      onLocationSelected: (coords: LocationObjectCoords) => {
        setLocation({
          latitude: coords.latitude,
          longitude: coords.longitude,
        });
      },
    });
  }

  function handleSubmit() {
    if (!title || !need || !responsible || !types.length || !location) return;

    const newDonation: Omit<Donation, 'id'> = {
      title,
      subtitle: responsible,
      goal: Number(need),
      raised: 0,
      imageUri: imageUri ?? '',
      types,
      location,
    };

    addDonation(newDonation);
    navigation.goBack();
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>

            <Text style={styles.title}>Cadastrar Doação</Text>

            <TouchableOpacity onPress={pickImage} style={styles.imagePicker}>
              {imageUri ? (
                <Image source={{ uri: imageUri }} style={styles.imagePreview} />
              ) : (
                <Text style={styles.imagePickerText}>Selecionar imagem</Text>
              )}
            </TouchableOpacity>

            <Input
              icon="pen"
              placeholder="Título da Doação"
              value={title}
              onChangeText={setTitle}
            />
            <Input
              icon="money-bill-wave"
              placeholder="Valor Necessario"
              keyboardType="numeric"
              value={need}
              onChangeText={setNeed}
            />
            <Input
              icon="user-tie"
              placeholder="Nome do Responsável"
              value={responsible}
              onChangeText={setResponsible}
            />
           <InputText
              icon="file-alt" 
              placeholder="Descrição"
              value={description}
              onChangeText={setDescription}
            />

            <Text style={styles.label}>Tipo de doação</Text>
            <View style={styles.typeContainer}>
              {['Dinheiro', 'Alimentação', 'Utensílios/Vestimenta'].map(type => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.typeButton,
                    types.includes(type) && styles.typeButtonActive,
                  ]}
                  onPress={() => toggleType(type)}
                >
                  <Text
                    style={[
                      styles.typeText,
                      types.includes(type) && { color: colors.card },
                    ]}
                  >
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity onPress={handleLocationSelect} style={styles.locationButton}>
              <Text style={styles.locationButtonText}>
                {location ? 'Localização selecionada' : 'Selecionar Localização no Mapa'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
              <Text style={styles.submitButtonText}>Criar Doação</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
