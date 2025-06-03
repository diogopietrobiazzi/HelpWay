import React, { useState, useEffect } from 'react';
import {  View,  Text,  ScrollView,  TouchableOpacity,  Image,  KeyboardAvoidingView,  Platform,  Keyboard,TouchableWithoutFeedback,} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation';

import Input from '../components/Input';
import InputDate from '../components/InputDate';
import InputPassword from '../components/InputPassword';
import Button from '../components/Button';

import { useAuth } from '../context/AuthContext';
import styles from '../styles/register';

type Props = NativeStackScreenProps<RootStackParamList, 'AlterarDados'>;

export default function AlterarDados({ navigation }: Props) {
  const { user, setUser } = useAuth();

  const [email, setEmail] = useState(user?.email || '');
  const [nome, setNome] = useState(user?.name || '');
  const [nascimento, setNascimento] = useState(
    user?.nascimento?.toISOString().split('T')[0] || ''
  );
  const [imagemUri, setImagemUri] = useState<string | null>(user?.imagem || null);
  const [tipoUsuario, setTipoUsuario] = useState<'doar' | 'receber'>(user?.tipo as any);
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

  function handleSalvar() {
    if (mostrarSenha) {
      if (senhaAtual !== user?.password) {
        setErroSenha('Senha atual incorreta.');
        return;
      }

      if (novaSenha !== confirmarNovaSenha) {
        setErroSenha('As novas senhas não coincidem.');
        return;
      }

      if (!novaSenha || novaSenha.length < 6) {
        setErroSenha('A nova senha deve ter pelo menos 6 caracteres.');
        return;
      }

      setErroSenha('');
    }

    setUser({
      ...user!,
      email,
      name: nome,
      nascimento: new Date(nascimento),
      imagem: imagemUri || '',
      tipo: tipoUsuario,
      password: mostrarSenha ? novaSenha : user!.password,
    });

    alert('Dados atualizados com sucesso!');
    navigation.navigate('Conta'); 
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
            {/* Botão de voltar */}
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

            <Input icon="person" placeholder="Nome Completo" value={nome} onChangeText={setNome} />
            <InputDate icon="calendar" placeholder="Data de Nascimento" value={nascimento} onChange={setNascimento} />
            <Input icon="mail" placeholder="Email" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />

            <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)} style={{ marginBottom: 10 }}>
              <Text style={{ color: '#007AFF', textAlign: 'center' }}>
                {mostrarSenha ? 'Cancelar troca de senha' : 'Trocar Senha'}
              </Text>
            </TouchableOpacity>

            {mostrarSenha && (
              <>
                <InputPassword placeholder="Senha Atual" value={senhaAtual} onChangeText={setSenhaAtual} />
                <InputPassword placeholder="Nova Senha" value={novaSenha} onChangeText={setNovaSenha} />
                <InputPassword placeholder="Confirmar Nova Senha" value={confirmarNovaSenha} onChangeText={setConfirmarNovaSenha} />
                {erroSenha ? <Text style={styles.error}>{erroSenha}</Text> : null}
              </>
            )}

            <Text style={styles.subTitle}>Tipo de usuário</Text>
            <TouchableOpacity
              style={styles.toggleUniqueButton}
              onPress={() => setTipoUsuario(prev => (prev === 'doar' ? 'receber' : 'doar'))}
            >
              <Text style={styles.toggleUniqueButtonText}>
                {tipoUsuario === 'doar' ? 'Doar' : 'Receber'}
              </Text>
            </TouchableOpacity>

            <Button title="Salvar Alterações" onPress={handleSalvar} />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
