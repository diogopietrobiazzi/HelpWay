import React, { createContext, useContext, useState } from 'react';
import doctorsImage from '../../assets/doctors1.png';
import ajudeRsImage from '../../assets/AjudeRs.jpg';
import { Image } from 'react-native';

export type Donation = {
  id: string;
  title: string;
  subtitle?: string;
  raised: number;
  goal: number;
  imageUri: string;
  types: string[];
  location: { latitude: number; longitude: number };
  description: string;
};

type DonationsContextType = {
  donations: Donation[];
  addDonation: (donation: Omit<Donation, 'id'>) => void;
  updateDonation: (id: string, amount: number) => void;
};

const DonationsContext = createContext<DonationsContextType>({
  donations: [],
  addDonation: () => {},
  updateDonation: () => {},
});

export const DonationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [donations, setDonations] = useState<Donation[]>([
    {
      id: '1',
      title: 'Ajude o RS',
      subtitle: 'Enchentes no Sul do Brasil',
      raised: 3000,
      goal: 10000,
      imageUri: Image.resolveAssetSource(ajudeRsImage).uri,
      types: ['Alimentos', 'Roupas'],
      location: {
        latitude: -30.0346,
        longitude: -51.2177,
      },
      description: 'Estamos arrecadando agasalhos para doar neste inverno.',
    },
    {
      id: '2',
      title: 'Ajuda Médica',
      subtitle: 'Médicos sem Fronteiras',
      raised: 5000,
      goal: 15000,
      imageUri: Image.resolveAssetSource(doctorsImage).uri,
      types: ['Medicamentos'],
      location: {
        latitude: -23.5505,
        longitude: -46.6333,
      },
      description: 'Estamos comprando medicamentos.',
    },
  ]);

  const addDonation = (donation: Omit<Donation, 'id'>) => {
    const newDonation: Donation = {
      id: Math.random().toString(),
      ...donation,
    };
    setDonations(prev => [...prev, newDonation]);
  };

  const updateDonation = (id: string, amount: number) => {
    setDonations(prev =>
      prev.map(donation =>
        donation.id === id
          ? { ...donation, raised: donation.raised + amount }
          : donation
      )
    );
  };

  return (
    <DonationsContext.Provider value={{ donations, addDonation, updateDonation }}>
      {children}
    </DonationsContext.Provider>
  );
};

export const useDonations = () => useContext(DonationsContext);
