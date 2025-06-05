import React, { createContext, useContext, useState } from 'react';

export type Donation = {
  id: string;
  title: string;
  subtitle?: string;
  raised: number;
  goal: number;
  imageUri: string;
  types: string[];
   location: {
    latitude: number;
    longitude: number;}
};

type DonationsContextType = {
  donations: Donation[];
  addDonation: (donation: Omit<Donation, 'id'>) => void;
  ctiveDonation?: Donation;
};

const DonationsContext = createContext<DonationsContextType>({
  donations: [],
  addDonation: () => {}, 
});

export const DonationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [donations, setDonations] = useState<Donation[]>([
     {
    id: '1',
    title: 'Ajude o RS',
    subtitle: 'Enchentes no Sul do Brasil',
    raised: 3000,
    goal: 10000,
    imageUri: 'https://via.placeholder.com/150',
    types: ['Alimentos', 'Roupas'],
    location: {
      latitude: -30.0346,
      longitude: -51.2177,
    },
  },
  {
    id: '2',
    title: 'Ajuda Médica',
    subtitle: 'Médicos sem Fronteiras',
    raised: 5000,
    goal: 15000,
    imageUri: 'https://via.placeholder.com/150',
    types: ['Medicamentos'],
    location: {
      latitude: -23.5505,
      longitude: -46.6333,
    },
  },
  ]);

  const addDonation = (donation: Omit<Donation, 'id'>) => {
    const newDonation: Donation = {
      id: Math.random().toString(),
      ...donation,
    };
    setDonations(prev => [...prev, newDonation]);
  };

  return (
    <DonationsContext.Provider value={{ donations, addDonation }}>
      {children}
    </DonationsContext.Provider>
  );
};

export const useDonations = () => useContext(DonationsContext);
