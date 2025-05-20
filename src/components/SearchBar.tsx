import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
};

export default function SearchBar({ value, onChangeText, placeholder = 'Pesquise' }: Props) {
  return (
    <View style={styles.container}>
      <Feather name="search" size={20} color="#666" />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#666"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#eee',
    borderRadius: 20,
    paddingHorizontal: 12,
    alignItems: 'center',
    height: 40,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
  },
});
