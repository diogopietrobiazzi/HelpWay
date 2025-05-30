import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../styles';

type Props = {
  value: 'doar' | 'receber' | null;
  onChange: (value: 'doar' | 'receber') => void;
};

export default function ToggleButtonGroup({ value, onChange }: Props) {
  return (
    <View style={styles.toggleContainer}>
      {['doar', 'receber'].map((option) => (
        <TouchableOpacity
          key={option}
          style={[
            styles.toggleButton,
            value === option && styles.toggleButtonSelected,
          ]}
          onPress={() => onChange(option as 'doar' | 'receber')}
        >
          <Text
            style={[
              styles.toggleText,
              value === option && styles.toggleTextSelected,
            ]}
          >
            {option === 'doar' ? 'Doar' : 'Receber'}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    gap: 10,
  },
  toggleButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  toggleButtonSelected: {
    backgroundColor: colors.primary,
  },
  toggleText: {
    color: colors.primary,
    fontWeight: '600',
  },
  toggleTextSelected: {
    color: '#fff',
  },
});
