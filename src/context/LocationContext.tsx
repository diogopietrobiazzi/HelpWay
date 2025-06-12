import React, { createContext, useState, useContext, ReactNode } from 'react';
import type { LocationObjectCoords } from 'expo-location';

type LocationContextData = {
  selectedLocation: LocationObjectCoords | null;
  setSelectedLocation: (location: LocationObjectCoords | null) => void;
};

const LocationContext = createContext<LocationContextData>({} as LocationContextData);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [selectedLocation, setSelectedLocation] = useState<LocationObjectCoords | null>(null);

  return (
    <LocationContext.Provider value={{ selectedLocation, setSelectedLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => useContext(LocationContext);