import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/navigation';
import { DonationsProvider } from './src/context/DonationsContext';
import { AuthProvider } from './src/context/AuthContext'; 

export default function App() {
  return (
    <AuthProvider> 
      <DonationsProvider>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </DonationsProvider>
    </AuthProvider>
  );
}