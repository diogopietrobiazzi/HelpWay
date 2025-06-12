import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  ActivityIndicator,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';
import Input from '../components/Input';
import InputDate from '../components/InputDate';
import InputPassword from '../components/InputPassword';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import styles from '../styles/register';

type Props = NativeStackScreenProps<RootStackParamList, 'AlterarDados'>;

export default function AlterarDados({ navigation }: Props) {
  const { user, passwordAuth, setUser } = useAuth();

  useEffect(() => {
    if (!user) {
      Alert.alert("Sessão Inválida", "Por favor, faça o login para acessar esta tela.");
      navigation.replace('Login');
    }
  }, [user, navigation]);

  const [email, setEmail] = useState(user?.email || '');
  const [nome, setNome] = useState(user?.nome || '');
  const [nascimento, setNascimento] = useState(
    user?.dt_nascimento ? new Date(user.dt_nascimento).toISOString().split('T')[0] : ''
  );
  const [imagemUri, setImagemUri] = useState<string | null>(
    user?.img_usuario ? `data:image/jpeg;base64,${user.img_usuario}` : null
  );
  const [imagemBase64, setImagemBase64] = useState<string | null>(null);
  const [tipoUsuario, setTipoUsuario] = useState<'doar' | 'receber'>(
    user?.tp_usuario === 1 ? 'doar' : 'receber'
  );
  const [tecladoAtivo, setTecladoAtivo] = useState(false);
  const [mostrarCamposSenha, setMostrarCamposSenha] = useState(false);
  const [senhaAtualParaTroca, setSenhaAtualParaTroca] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState('');
  const [erroSenha, setErroSenha] = useState('');

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () => setTecladoAtivo(true));
    const hideSub = Keyboard.addListener('keyboardDidHide', () => setTecladoAtivo(false));
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  async function selecionarImagem() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Atenção', 'Permissão para acessar a galeria de imagens é necessária.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
      allowsEditing: true,
      aspect: [1, 1],
      base64: true,
    });
    if (!result.canceled) {
      setImagemUri(result.assets[0].uri);
      setImagemBase64(result.assets[0].base64 ?? null);
    }
  }

  async function handleSalvar() {
    if (!user) return;
    let senhaParaValidacao = '';
    if (mostrarCamposSenha) {
      if (!senhaAtualParaTroca) {
        Alert.alert('Atenção', 'Para trocar a senha, você precisa digitar sua senha atual.');
        return;
      }
      if (novaSenha.length < 6) {
        setErroSenha('A nova senha precisa ter no mínimo 6 caracteres.');
        return;
      }
      if (novaSenha !== confirmarNovaSenha) {
        setErroSenha('As novas senhas não coincidem.');
        return;
      }
      senhaParaValidacao = senhaAtualParaTroca;
    } else {
      senhaParaValidacao = passwordAuth || '';
    }
    if (!senhaParaValidacao) {
      Alert.alert('Erro de Autenticação', 'Sua sessão é inválida. Por favor, faça o login novamente.');
      return;
    }
    setErroSenha('');
    
    const dadosParaAtualizar: any = {
      nome,
      email,
      dt_nascimento: new Date(nascimento).toISOString(),
      tp_usuario: tipoUsuario === 'doar' ? 1 : 2,
      senha_atual: senhaParaValidacao,
    };

    if (imagemBase64) {
      dadosParaAtualizar.img_usuario = imagemBase64;
    }
    if (mostrarCamposSenha && novaSenha) {
      dadosParaAtualizar.nova_senha = novaSenha;
    }

    try {
      await api.updateUser(user.id, dadosParaAtualizar);
      const finalUserObject = {
         ...user, 
         nome,
         email,
         dt_nascimento: dadosParaAtualizar.dt_nascimento,
         tp_usuario: dadosParaAtualizar.tp_usuario,
         img_usuario: imagemBase64 ?? user.img_usuario,
      };
      setUser(finalUserObject);
      Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
      navigation.goBack();
    } catch (error: any) {
      console.error('Erro ao atualizar dados:', error);
      Alert.alert('Erro', error.message || 'Não foi possível atualizar os dados.');
    }
  }

  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#4B4DED" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={styles.flex1} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          scrollEnabled={tecladoAtivo}
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.title}>Alterar Dados</Text>
            <TouchableOpacity onPress={selecionarImagem} style={{ alignSelf: 'center', marginBottom: 20 }}>
              {imagemUri ? (
                <Image source={{ uri: imagemUri }} style={styles.profileImage} />
              ) : (
                <View style={styles.imagePlaceholder}>
                  <Ionicons name="person-circle-outline" size={80} color="#ccc" />
                </View>
              )}
            </TouchableOpacity>
            <Input icon="user" placeholder="Nome Completo" value={nome} onChangeText={setNome} />
            <InputDate
              icon="calendar"
              placeholder="Data de Nascimento"
              value={nascimento}
              onChange={setNascimento}
            />
            <Input
              icon="envelope"
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
            <TouchableOpacity
              onPress={() => setMostrarCamposSenha(!mostrarCamposSenha)}
              style={{ marginBottom: 15, paddingVertical: 5 }}
            >
              <Text style={{ color: '#007AFF', textAlign: 'center' }}>
                {mostrarCamposSenha ? 'Cancelar Troca de Senha' : 'Trocar Senha'}
              </Text>
            </TouchableOpacity>
            {mostrarCamposSenha && (
              <>
                <InputPassword
                  placeholder="Senha Atual"
                  value={senhaAtualParaTroca}
                  onChangeText={setSenhaAtualParaTroca}
                />
                <InputPassword
                  placeholder="Nova Senha"
                  value={novaSenha}
                  onChangeText={setNovaSenha}
                />
                <InputPassword
                  placeholder="Confirmar Nova Senha"
                  value={confirmarNovaSenha}
                  onChangeText={setConfirmarNovaSenha}
                />
              </>
            )}
            {erroSenha ? <Text style={styles.error}>{erroSenha}</Text> : null}
            <Text style={styles.subTitle}>Você deseja?</Text>
            <TouchableOpacity
              style={styles.toggleUniqueButton}
              onPress={() =>
                setTipoUsuario((prev) => (prev === 'doar' ? 'receber' : 'doar'))
              }
            >
              <Text style={styles.toggleUniqueButtonText}>
                {tipoUsuario === 'doar' ? 'Ajudar Pessoas' : 'Receber Ajuda'}
              </Text>
            </TouchableOpacity>
            <Button title="Salvar Alterações" onPress={handleSalvar} />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}