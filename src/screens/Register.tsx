import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView,Platform,ScrollView,TouchableWithoutFeedback,Keyboard,} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Input from '../components/Input';
import InputPassword from '../components/InputPassword';
import Button from '../components/Button';
import { RootStackParamList } from '../navigation';
import styles from '../styles/register';
import InputDate from '../components/InputDate';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

export default function Register({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [nome, setNome] = useState('');
  const [usuario, setUsuario] = useState('');
  const [nascimento, setNascimento] = useState('');

  const [emailErro, setEmailErro] = useState('');
  const [senhaErro, setSenhaErro] = useState('');

  function validarEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
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
      navigation.replace('SearchDonation');
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0} 
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <Text style={styles.title}>Cadastrar</Text>

            <Input
              icon="person"
              placeholder="Nome Completo"
              value={nome}
              onChangeText={setNome}
            />

            <Input
              icon="person-outline"
              placeholder="Nome de Usuário"
              value={usuario}
              onChangeText={setUsuario}
            />

            <InputDate
              icon="calendar"
              placeholder="Data de Nascimento"
              value={nascimento}
              onChange={setNascimento}
            />

            <Input
              icon="mail"
              placeholder="Seu Email"
              value={email}
              onChangeText={setEmail}
            />
            {emailErro ? <Text style={styles.error}>{emailErro}</Text> : null}

            <InputPassword
              placeholder="Sua Senha"
              value={senha}
              onChangeText={setSenha}
            />

            <InputPassword
              placeholder="Confirmar Senha"
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
            />
            {senhaErro ? <Text style={styles.error}>{senhaErro}</Text> : null}

            <Text style={styles.forgot}>Alterar a senha</Text>

            <Button title="Salvar" onPress={handleLogin} />

            <View style={styles.registerContainer} />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
