import React, { useState, useEffect } from 'react';
import {  View,  Text,  ScrollView,  TouchableOpacity,  Image,  KeyboardAvoidingView,  Platform,  Keyboard,  TouchableWithoutFeedback,  Alert,} from 'react-native';
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
  const { user, setUser } = useAuth();

  const [email, setEmail] = useState(user?.email || '');
  const [nome, setNome] = useState(user?.nome || '');
  const [nascimento, setNascimento] = useState(
    user?.dt_nascimento ? new Date(user.dt_nascimento).toISOString().split('T')[0] : ''
  );
  const [imagemUri, setImagemUri] = useState<string | null>(user?.img_usuario || null);
  const [tipoUsuario, setTipoUsuario] = useState<'doar' | 'receber'>(
    user?.tp_usuario === 1 ? 'doar' : 'receber'
  );
  const [tecladoAtivo, setTecladoAtivo] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [senhaAtual, setSenhaAtual] = useState('');
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
      quality: 1,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      setImagemUri(result.assets[0].uri);
    }
  }

  async function handleSalvar() {
    if (!user) return;

    if (mostrarSenha) {
      if (novaSenha !== confirmarNovaSenha) {
        setErroSenha('As novas senhas não coincidem.');
        return;
      }
      if (senhaAtual && (!novaSenha || novaSenha.length < 6)) {
        setErroSenha('A nova senha deve ter pelo menos 6 caracteres.');
        return;
      }
      setErroSenha('');
    }

    if (!nome || !email || !nascimento) {
      Alert.alert('Atenção', 'Nome, email e data de nascimento são obrigatórios.');
      return;
    }
    
    const dadosParaAtualizar = {
      nome,
      email,
      dt_nascimento: new Date(nascimento).toISOString(),
      img_usuario: imagemUri || user.img_usuario,
      tp_usuario: tipoUsuario === 'doar' ? 1 : 2,
      ...(mostrarSenha && senhaAtual && {
        senha_atual: senhaAtual,
        nova_senha: novaSenha,
      }),
    };

    try {
      const usuarioAtualizado = await api.updateUser(user.id, dadosParaAtualizar);

      setUser(usuarioAtualizado);

      Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
      navigation.navigate('Conta');
    } catch (error: any) {
      console.error('Erro ao atualizar dados:', error);
      Alert.alert('Erro', error.message || 'Não foi possível atualizar os dados.');
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex1}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
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

            <TouchableOpacity onPress={selecionarImagem}>
              {imagemUri ? (
                <Image source={{ uri: imagemUri }} style={styles.profileImage} />
              ) : (
                <View style={styles.imagePlaceholder}>
                  <Ionicons name="person-circle-outline" size={64} color="#ccc" />
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
              onPress={() => setMostrarSenha(!mostrarSenha)}
              style={{ marginBottom: 10, paddingVertical: 5 }}
            >
              <Text style={{ color: '#007AFF', textAlign: 'center' }}>
                {mostrarSenha ? 'Cancelar troca de senha' : 'Trocar Senha'}
              </Text>
            </TouchableOpacity>

            {mostrarSenha && (
              <>
                <InputPassword
                  placeholder="Senha Atual"
                  value={senhaAtual}
                  onChangeText={setSenhaAtual}
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
                {erroSenha ? <Text style={styles.error}>{erroSenha}</Text> : null}
              </>
            )}

            <Text style={styles.subTitle}>Tipo de usuário</Text>
            <TouchableOpacity
              style={styles.toggleUniqueButton}
              onPress={() =>
                setTipoUsuario((prev) => (prev === 'doar' ? 'receber' : 'doar'))
              }
            >
              <Text style={styles.toggleUniqueButtonText}>
                {tipoUsuario === 'doar' ? 'Quero Ajudar' : 'Preciso de Ajuda'}
              </Text>
            </TouchableOpacity>

            <Button title="Salvar Alterações" onPress={handleSalvar} />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}