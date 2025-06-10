import React, { useState, useEffect } from 'react';
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Pressable,
  Modal,
  TextInput,
} from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/login';

import Input from '../components/Input';
import InputPassword from '../components/InputPassword';
import { useAuth } from '../context/AuthContext';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';

import { api } from '../services/api';

WebBrowser.maybeCompleteAuthSession();

type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProps>();
  const { login, setUser } = useAuth(); 

  const [loginInput, setLoginInput] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');

  const [request, response, promptAsync] = Google.useAuthRequest({
        clientId: 'SEU_WEB_CLIENT_ID_DO_GOOGLE_AQUI',

  });

  const validarLogin = async () => {
    if (!loginInput || !senha) {
      setError('Preencha todos os campos.');
      return;
    }
    setError('');

    const result = await login(loginInput, senha);

    if (result.success) {
      Alert.alert('Login realizado com sucesso!');
      navigation.navigate('SearchDonation');
    } else {
      setError(result.message || 'Erro desconhecido');
    }
  };
  
  const handleGoogleLogin = async () => {
    try {
      const result = await promptAsync();
      if (result?.type === 'success' && result.authentication?.accessToken) {
        const userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
          headers: { Authorization: `Bearer ${result.authentication.accessToken}` },
        });
        const userInfo = await userInfoResponse.json();
        
        try {
          const usuarioExistente = await api.getUserByEmail(userInfo.email);
          setUser(usuarioExistente);
          Alert.alert('Login com Google realizado!');
          navigation.navigate('SearchDonation');
        } catch (e) {
          console.log('Usuário não encontrado, cadastrando com Google...');
          const novoUsuario = {
            nome: userInfo.name,
            email: userInfo.email,
            senha: Math.random().toString(36).slice(-10),
            dt_nascimento: '1990-01-01',
            img_usuario: userInfo.picture,
            tp_usuario: 2,
          };

          const usuarioCriado = await api.createUser(novoUsuario);
          setUser(usuarioCriado);
          Alert.alert('Bem-vindo!', 'Sua conta foi criada com o Google.');
          navigation.navigate('SearchDonation');
        }
      } else {
         if (result?.type === 'error') throw new Error(result.error?.message);
         if (result?.type === 'cancel') Alert.alert('Aviso', 'Login com Google cancelado.');
      }
    } catch (error: any) {
      Alert.alert('Erro no Login com Google', error.message || 'Não foi possível autenticar.');
      console.error("Erro Google:", error);
    }
  };


  const goToRegister = () => {
    navigation.navigate('Register');
  };

  const handleSendRecovery = () => {
    if (!recoveryEmail.includes('@')) {
      Alert.alert('Erro', 'Digite um e-mail válido.');
      return;
    }
    Alert.alert('Recuperação enviada', `Enviamos um e-mail para ${recoveryEmail}.`);
    setModalVisible(false);
    setRecoveryEmail('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>HelpWay</Text>

      <Input
        icon="user"
        placeholder="Seu login ou e-mail"
        value={loginInput}
        onChangeText={setLoginInput}
      />

      <InputPassword
        placeholder="Sua senha"
        value={senha}
        onChangeText={setSenha}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.forgot}>Esqueceu a senha?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={validarLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <Text style={styles.or}>ou</Text>

      <TouchableOpacity
        style={styles.googleButton}
        onPress={handleGoogleLogin}
        disabled={!request}
      >
        <Image
          source={require('../../assets/google-logo.png')}
          style={{ width: 24, height: 24, marginRight: 8 }}
        />
        <Text style={styles.googleText}>Google</Text>
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <Text>Não tem login ainda? </Text>
        <Pressable onPress={goToRegister}>
          <Text style={styles.register}>Registrar</Text>
        </Pressable>
      </View>
      
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Recuperar Senha</Text>

            <TextInput
              placeholder="Digite seu e-mail"
              style={styles.input}
              value={recoveryEmail}
              onChangeText={setRecoveryEmail}
              keyboardType="email-address"
            />

            <TouchableOpacity style={styles.button} onPress={handleSendRecovery}>
              <Text style={styles.buttonText}>Enviar</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)} style={{marginTop: 15}}>
              <Text style={[styles.forgot, { textAlign: 'center' }]}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}