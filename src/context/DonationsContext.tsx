import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Donation = {
  id: string;
  imageSource: any; // ImageSourcePropType
  title: string;
  subtitle: string;
  raised: number;
  goal: number;
};

type DonationsContextType = {
  donations: Donation[];
  addDonation: (d: Omit<Donation, 'id'>) => void;
  removeDonation: (id: string) => void;
};

const DonationsContext = createContext<DonationsContextType | undefined>(undefined);

export function DonationsProvider({ children }: { children: ReactNode }) {
  const [donations, setDonations] = useState<Donation[]>([
    // valor inicial opcional
  ]);

  function addDonation(d: Omit<Donation, 'id'>) {
    setDonations(prev => [
      ...prev,
      { id: Date.now().toString(), ...d },
    ]);
  }

  function removeDonation(id: string) {
    setDonations(prev => prev.filter(d => d.id !== id));
  }

  return (
    <DonationsContext.Provider value={{ donations, addDonation, removeDonation }}>
      {children}
    </DonationsContext.Provider>
  );
}

export function useDonations() {
  const ctx = useContext(DonationsContext);
  if (!ctx) throw new Error('useDonations must be inside DonationsProvider');
  return ctx;
}
