import React, { createContext, useContext, useState } from 'react';
import { Image } from 'react-native';
import doctorsImage from '../../assets/doctors1.png';
import ajudeRsImage from '../../assets/AjudeRs.jpg';
import {api} from '../services/api';

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
  addDonation: (donation: Omit<Donation, 'id'>) => Promise<void>;
  updateDonation: (id: string, amount: number) => void;
};

const DonationsContext = createContext<DonationsContextType>({
  donations: [],
  addDonation: async () => {},
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

  const addDonation = async (donationData: Omit<Donation, 'id' | 'raised'>) => {
    const donationPayload = {
      titulo: donationData.title,
      subtitulo: donationData.subtitle,
      descricao: donationData.description,
      imagem_url: donationData.imageUri,
      meta_doacoes: donationData.goal,
      valor_levantado: 0,
      fg_dinheiro: donationData.types.includes('Dinheiro'),
      fg_alimentacao: donationData.types.includes('Alimentos'),
      fg_vestuario: donationData.types.includes('Roupas'),
      localizacao: {
        latitude: donationData.location.latitude,
        longitude: donationData.location.longitude,
      },
    };

    try {
      const newDonationFromApi = await api.createDonation(donationPayload);

      const newDonationForState: Donation = {
        id: newDonationFromApi.id,
        title: newDonationFromApi.titulo,
        subtitle: newDonationFromApi.subtitulo,
        raised: newDonationFromApi.valor_levantado,
        goal: newDonationFromApi.meta_doacoes,
        imageUri: newDonationFromApi.imagem_url,
        description: newDonationFromApi.descricao,
        location: newDonationFromApi.localizacao,
        types: donationData.types, 
      };
      
      setDonations(prev => [...prev, newDonationForState]);

    } catch (error) {
      console.error('Erro ao criar doação:', error);
      throw error;
    }
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
