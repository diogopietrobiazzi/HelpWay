import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

type Tab = { icon: string; label: string; onPress: () => void };

export default function TabBar({ tabs }: { tabs: Tab[] }) {
  return (
    <View style={styles.container}>
      {tabs.map(t => (
        <TouchableOpacity key={t.label} style={styles.tab} onPress={t.onPress}>
          <Feather name={t.icon as any} size={24} color="#fff" />
          <Text style={styles.text}>{t.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#2D4BFF',
    paddingVertical: 8,
    justifyContent: 'space-around',
  },
  tab: { alignItems: 'center' },
  text: { color: '#fff', fontSize: 12, marginTop: 2 },
});
