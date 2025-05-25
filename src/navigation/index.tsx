import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/login';
import SearchDonation from '../screens/SearchDonation';
import DonationDetail from '../screens/DonationDetail';
import AddDonation from '../screens/AddDonation';
import Conta from '../screens/Conta';
import Register from '../screens/Register';
import Map from '../screens/Map';
import DonationPay from '../screens/DonationPay';
import DonationPix from '../screens/DonationPix';

export type DonationType = {
  id: string;
  imageUri: string;
  title: string;
  subtitle?: string;
  raised: number;
  goal: number;
};


export type RootStackParamList = {
  Login: undefined;
  SearchDonation: undefined;        //  blueprint exata da rota
  DonationDetail: { donation: DonationType };
  Conta: undefined;
  AddDonation: undefined;
  Register: undefined;
  Map: undefined;
  DonationPix: { donationAmount: string; donationName?: string; onCancel: () => void };
  DonationPay: { donation: DonationType };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>       
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Map" component={Map} />
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="SearchDonation" component={SearchDonation} />
    <Stack.Screen name="DonationDetail" component={DonationDetail} />
    <Stack.Screen name="Conta" component={Conta} />
    <Stack.Screen name="AddDonation" component={AddDonation} />
    <Stack.Screen name="DonationPix" component={DonationPix} />
    <Stack.Screen name="DonationPay" component={DonationPay} />

    </Stack.Navigator>
  );
}
