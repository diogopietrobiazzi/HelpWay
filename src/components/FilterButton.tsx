import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

type Props = { onPress: () => void };

export default function FilterButton({ onPress }: Props) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Feather name="sliders" size={20} color="#333" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginLeft: 12,
    backgroundColor: '#eee',
    padding: 8,
    borderRadius: 20,
  },
});
