// src/context/DonationsContext.tsx

import React, { createContext, useContext, useState } from 'react';

export type Donation = {
  id: string;
  title: string;
  subtitle?: string;
  raised: number;
  goal: number;
  imageUri: string; // <-- ADICIONADO AQUI
};

type DonationsContextType = {
  donations: Donation[];
};

const DonationsContext = createContext<DonationsContextType>({ donations: [] });

export const DonationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [donations, setDonations] = useState<Donation[]>([
    {
      id: '1',
      title: 'Ajude o RS',
      subtitle: 'Enchentes no Sul do Brasil',
      raised: 3000,
      goal: 10000,
      imageUri: 'https://via.placeholder.com/150', // exemplo de imagem remota
    },
    {
      id: '2',
      title: 'Ajuda Médica',
      subtitle: 'Médicos sem Fronteiras',
      raised: 5000,
      goal: 15000,
      imageUri: 'https://via.placeholder.com/150', // ou use require('../../assets/alguma.png')
    },
  ]);

  return (
    <DonationsContext.Provider value={{ donations }}>
      {children}
    </DonationsContext.Provider>
  );
};

export const useDonations = () => useContext(DonationsContext);
