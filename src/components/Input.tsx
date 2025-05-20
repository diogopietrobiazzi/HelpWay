// src/components/Input.tsx
import React from 'react';
import { TextInput, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  icon: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

export default function Input({ icon, placeholder, value, onChangeText }: Props) {
  return (
    <View style={styles.container}>
      <Ionicons name={icon as any} size={20} style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#aaa"
      />
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
  },
  icon: {
    marginRight: 10,
    color: '#888',
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
});
