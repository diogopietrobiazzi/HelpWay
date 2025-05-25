import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native'; // <-- adicione Pressable
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Input from '../components/Input';
import InputPassword from '../components/InputPassword';
import Button from '../components/Button';
import GoogleButton from '../components/GoogleButton';
import { RootStackParamList } from '../navigation';
import styles from '../styles/login';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function handleLogin() {
    navigation.replace('SearchDonation');
  }

  function goToRegister() {
    navigation.navigate('Register');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>HelpWay</Text>

      <Input
        icon="person"
        placeholder="Seu login/email"
        value={email}
        onChangeText={setEmail}
      />

      <InputPassword
        placeholder="Sua senha"
        value={senha}
        onChangeText={setSenha}
      />

      <Text style={styles.forgot}>Esqueceu a senha ?</Text>

      <Button title="Login" onPress={handleLogin} />

      <GoogleButton />

      <View style={styles.registerContainer}>
        <Text>Não tem login ainda? </Text>
        <Pressable onPress={goToRegister}>
          <Text style={styles.register}>Registrar</Text>
        </Pressable>
      </View>
    </View>
  );
}
