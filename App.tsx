// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/navigation';
import { DonationsProvider } from './src/context/DonationsContext';

export default function App() {
  return (
    <DonationsProvider>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </DonationsProvider>
  );
}
