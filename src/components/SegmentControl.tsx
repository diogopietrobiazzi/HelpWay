import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

type Props = {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
};

export default function SegmentControl({ options, selected, onSelect }: Props) {
  return (
    <View style={styles.container}>
      {options.map(opt => (
        <TouchableOpacity
          key={opt}
          style={[
            styles.tab,
            opt === selected && styles.tabActive
          ]}
          onPress={() => onSelect(opt)}
        >
          <Text style={[styles.text, opt === selected && styles.textActive]}>
            {opt}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: 'row', marginVertical: 12 },
  tab: {
    flex: 1,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 16,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  tabActive: { backgroundColor: '#c0c4ff', borderColor: '#2D4BFF' },
  text: { fontSize: 12, color: '#333' },
  textActive: { color: '#2D4BFF', fontWeight: 'bold' },
});
