import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/navigation';
import { DonationsProvider } from './src/context/DonationsContext';
import { AuthProvider } from './src/context/AuthContext';
import { LocationProvider } from './src/context/LocationContext'; 

export default function App() {
  return (
    <AuthProvider>
      <DonationsProvider>
        <LocationProvider> 
          <NavigationContainer>
            <Navigation />
          </NavigationContainer>
        </LocationProvider>
      </DonationsProvider>
    </AuthProvider>
  );
}