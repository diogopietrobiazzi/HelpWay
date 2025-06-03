import React, { useState } from 'react';
import {  Image,  View,  Text,  TouchableOpacity,  Alert,  Pressable,  Modal,  TextInput,} from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/login';

import Input from '../components/Input';
import InputPassword from '../components/InputPassword';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';

const ImgAdm = require('../../assets/ImgAdm.png');

import { useAuth } from '../context/AuthContext';

type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'Login'>;

WebBrowser.maybeCompleteAuthSession();

const fakeUsers = [
  {
    name: 'Administrador',
    email: 'adm@t.com',
    password: '123456',
    nascimento: new Date('1985-06-10'),
    imagem: Image.resolveAssetSource(ImgAdm).uri,
    tipo: 'admin',
  },
];

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProps>();
  const { setUser } = useAuth();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState('');

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: 'SEU_CLIENT_ID_DO_GOOGLE',
  });

  const validarLogin = () => {
    const user = fakeUsers.find(u => u.email === email);
    if (!user) {
      setError('E-mail não encontrado');
    } else if (user.password !== senha) {
      setError('Senha incorreta');
    } else {
      setError('');
      setUser(user); 
      Alert.alert('Login realizado com sucesso!');
      navigation.navigate('SearchDonation');
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
        icon="person"
        placeholder="Seu login/email"
        value={email}
        onChangeText={setEmail}
      />
      {error === 'E-mail não encontrado' && (
        <Text style={styles.error}>{error}</Text>
      )}

      <InputPassword
        placeholder="Sua senha"
        value={senha}
        onChangeText={setSenha}
      />
      {error === 'Senha incorreta' && (
        <Text style={styles.error}>{error}</Text>
      )}

      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={styles.forgot}>Esqueceu a senha?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={validarLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <Text style={styles.or}>ou</Text>

      <TouchableOpacity
        style={styles.googleButton}
        onPress={() => promptAsync()}
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
              <Text style={styles.buttonText}>Enviar recuperação de senha</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={[styles.forgot, { textAlign: 'center', marginTop: 10 }]}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
