import React, { useState, useEffect } from 'react';
import {  View,  Text,  KeyboardAvoidingView,  Platform,  ScrollView,  TouchableWithoutFeedback,  Keyboard,  Image,  TouchableOpacity,} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';

import Input from '../components/Input';
import InputPassword from '../components/InputPassword';
import Button from '../components/Button';
import InputDate from '../components/InputDate';

import { useAuth } from '../context/AuthContext';
import styles from '../styles/register';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export default function Register({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [nome, setNome] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [imagemUri, setImagemUri] = useState<string | null>(null);
  const [tipoUsuario, setTipoUsuario] = useState<'doar' | 'receber' | null>(null);

  const [emailErro, setEmailErro] = useState('');
  const [senhaErro, setSenhaErro] = useState('');
  const [tecladoAtivo, setTecladoAtivo] = useState(false);

  const { setUser } = useAuth();

  useEffect(() => {
    const mostrar = Keyboard.addListener('keyboardDidShow', () => setTecladoAtivo(true));
    const esconder = Keyboard.addListener('keyboardDidHide', () => setTecladoAtivo(false));

    return () => {
      mostrar.remove();
      esconder.remove();
    };
  }, []);

  function validarEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  async function selecionarImagem() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permissão para acessar imagens negada.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      setImagemUri(result.assets[0].uri);
    }
  }

  function handleLogin() {
    let valido = true;

    if (!validarEmail(email)) {
      setEmailErro('Digite um e-mail válido.');
      valido = false;
    } else {
      setEmailErro('');
    }

    if (senha !== confirmarSenha) {
      setSenhaErro('As senhas não coincidem.');
      valido = false;
    } else {
      setSenhaErro('');
    }

    if (valido) {
      setUser({
        name: nome,
        email: email,
        nascimento: new Date(nascimento),
        password: senha,
        imagem: imagemUri || '',
        tipo: tipoUsuario || '',
      });

      navigation.replace('SearchDonation');
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex1}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          scrollEnabled={tecladoAtivo}
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>

            <View style={styles.headerRow}>
              <Text style={styles.title}>Cadastrar</Text>
              <TouchableOpacity onPress={selecionarImagem}>
                {imagemUri ? (
                  <Image source={{ uri: imagemUri }} style={styles.profileImage} />
                ) : (
                  <View style={styles.imagePlaceholder}>
                    <Ionicons name="person-circle-outline" size={64} color="#ccc" />
                  </View>
                )}
              </TouchableOpacity>
            </View>

            <Input icon="person" placeholder="Nome Completo" value={nome} onChangeText={setNome} />
            <InputDate icon="calendar" placeholder="Data de Nascimento" value={nascimento} onChange={setNascimento} />
            <Input icon="mail" placeholder="Seu Email" value={email} onChangeText={setEmail} />
            {emailErro ? <Text style={styles.error}>{emailErro}</Text> : null}

            <InputPassword placeholder="Sua Senha" value={senha} onChangeText={setSenha} />
            <InputPassword placeholder="Confirmar Senha" value={confirmarSenha} onChangeText={setConfirmarSenha} />
            {senhaErro ? <Text style={styles.error}>{senhaErro}</Text> : null}

            <Text style={styles.subTitle}>Você deseja doar ou receber?</Text>
              <TouchableOpacity
                style={styles.toggleUniqueButton}
                onPress={() => setTipoUsuario(prev => (prev === 'doar' ? 'receber' : 'doar'))}
              >
                <Text style={styles.toggleUniqueButtonText}>{tipoUsuario === 'doar' ? 'Doar' : 'Receber'}</Text>
              </TouchableOpacity>

            <Button title="Salvar" onPress={handleLogin} />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
