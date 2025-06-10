import React, { useState } from 'react';
import {  View,  Text,  TouchableOpacity,  ScrollView,Image,  KeyboardAvoidingView,  Platform,  TouchableWithoutFeedback,  Keyboard,  Alert,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';
import type { LocationObjectCoords } from 'expo-location';

import InputText from '../components/InputText';
import Input from '../components/Input';
import { RootStackParamList } from '../navigation';
import { colors } from '../styles';
import styles from '../styles/addDonation';
import { api } from '../services/api';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'AddDonation'>;

export default function AddDonationScreen() {
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
        console.log('--- Coordenadas recebidas do mapa:', coords, '---'); 
        
        if (coords && typeof coords.latitude === 'number' && typeof coords.longitude === 'number') {
          setLocation({
            latitude: coords.latitude,
            longitude: coords.longitude,
          });
        } else {
          console.error('Dados de coordenadas inválidos recebidos do mapa.');
          Alert.alert('Erro', 'Ocorreu um erro ao selecionar a localização.');
        }
      },
    });
  }

  async function handleSubmit() {
    console.log("--- 1. Botão 'Criar Doação' pressionado ---");

    if (!title || !need || !responsible || !types.length || !description) {
      Alert.alert('Atenção', 'Preencha todos os campos obrigatórios.');
      return;
    }

    const donationData = {
      titulo: title,
      subtitulo: responsible,
      descricao: description,
      imagem_url: imageUri ?? 'https://via.placeholder.com/300x200.png?text=Doacao',
      meta_doacoes: Number(need),
      valor_levantado: 0,
      fg_dinheiro: types.includes('Dinheiro'),
      fg_alimentacao: types.includes('Alimentação'),
      fg_vestuario: types.includes('Utensílios/Vestimenta'),
    };

    console.log("--- 2. Dados da doação (sem localização) prontos para envio:", donationData);
    if(location) {
      console.log("--- Localização a ser enviada:", location);
    }

    try {
      console.log("--- 3. Tentando chamar api.createDonation... ---");
      const createdDonation = await api.createDonation(donationData);
      console.log("--- 4. SUCESSO! Doação criada com ID:", createdDonation.id, "---");

      if (location) {
        console.log("--- 5. Tentando chamar api.updateDonationLocation... ---");
        await api.updateDonationLocation(createdDonation.id, location);
        console.log("--- 6. SUCESSO! Localização adicionada. ---");
      }

      console.log("--- 7. Exibindo alerta de sucesso e fechando a tela. ---");
      Alert.alert('Sucesso!', 'Doação criada com sucesso!');
      navigation.goBack();

    } catch (error: any) {
      console.error("--- X. ERRO CAPTURADO! ---");
      console.error(error);
      Alert.alert('Erro', error.message || 'Não foi possível criar a doação.');
    }
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