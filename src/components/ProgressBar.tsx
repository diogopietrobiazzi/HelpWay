import React from 'react';
import { View, StyleSheet } from 'react-native';

type Props = { progress: number };

export default function ProgressBar({ progress }: Props) {
  return (
    <View style={styles.bg}>
      <View style={[styles.fg, { flex: progress }]} />
      <View style={{ flex: 1 - progress }} />
    </View>
  );
}

const styles = StyleSheet.create({
  bg: {
    height: 6,
    flexDirection: 'row',
    backgroundColor: '#eee',
    borderRadius: 3,
    overflow: 'hidden',
    marginVertical: 8,
  },
  fg: {
    backgroundColor: '#2D4BFF',
  },
});
