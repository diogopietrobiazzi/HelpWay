import React from 'react';
import { TextInput, View, StyleSheet, TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props extends TextInputProps {
  icon: string;
}

export default function Input({ icon, style, ...rest }: Props) {
  return (
    <View style={styles.container}>
      <Ionicons name={icon as any} size={20} style={styles.icon} />
      <TextInput
        style={[styles.input, style]}
        placeholderTextColor="#aaa"
        {...rest} 
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
    width: 355,
    height:65
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
