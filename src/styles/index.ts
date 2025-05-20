// src/styles/index.ts

import { StyleSheet } from 'react-native';

// 1. Cores
export const colors = {
  primary: '#2D4BFF',
  secondary: '#A6B1FF',
  background: '#F9F9F9',
  card: '#FFFFFF',
  text: '#333333',
  textLight: '#555555',
  border: '#CCCCCC',
};

// 2. Fontes
export const fonts = {
  sizes: {
    h1: 32,
    h2: 24,
    body: 16,
    small: 12,
  },
  weights: {
    bold: '700' as const,
    regular: '400' as const,
  },
};

// 3. Logos / Imagens
export const images = {
  logo: require('../../assets/doctors1.png'),
  msf: require('../../assets/msf-logo.png'),
};

// 4. Estilos globais reutilizáveis
export const globals = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: fonts.sizes.h1,
    fontWeight: fonts.weights.bold,
    color: colors.primary,
  },
  text: {
    fontSize: fonts.sizes.body,
    color: colors.text,
  },
  border: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
  },
});
