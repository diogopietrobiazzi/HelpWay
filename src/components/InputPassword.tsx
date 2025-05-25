import React, { useState } from 'react';
import { TextInput, View, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

export default function InputPassword({ placeholder, value, onChangeText }: Props) {
  const [secure, setSecure] = useState(true);

  return (
    <View style={styles.container}>
      <Ionicons name="lock-closed-outline" size={20} style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        secureTextEntry={secure}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#aaa"
      />
      <Pressable onPress={() => setSecure(!secure)}>
        <Ionicons
          name={secure ? 'eye-off-outline' : 'eye-outline'}
          size={20}
          style={styles.icon}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 10,
    width: 355,
    height:65
  },
  icon: {
    color: '#888',
    marginHorizontal: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
});
