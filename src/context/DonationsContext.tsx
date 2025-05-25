import React, { createContext, useContext, useState } from 'react';

export type Donation = {
  id: string;
  title: string;
  subtitle?: string;
  raised: number;
  goal: number;
  imageUri: string;
};

type DonationsContextType = {
  donations: Donation[];
  addDonation: (donation: Omit<Donation, 'id'>) => void;
};

const DonationsContext = createContext<DonationsContextType>({
  donations: [],
  addDonation: () => {}, // fallback vazio
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
    },
    {
      id: '2',
      title: 'Ajuda Médica',
      subtitle: 'Médicos sem Fronteiras',
      raised: 5000,
      goal: 15000,
      imageUri: 'https://via.placeholder.com/150',
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
