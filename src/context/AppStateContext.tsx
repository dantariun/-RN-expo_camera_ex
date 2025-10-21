import { DiagnosisMode } from '@/constants/DiagnosisModes';
import React, { createContext, ReactNode, useContext, useState } from 'react';

interface AppStateContextType {
  mode: DiagnosisMode | null;
  name: String | null;
  phoneNumber: String | null
  setUserName: (name: String | null) => void;
  setUserPhoneNumber: (phoneNumber: String | null) => void;
  setMode: (mode: DiagnosisMode | null) => void;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export const AppStateProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<DiagnosisMode | null>(null);
  const [name, setUserName] = useState<String | null>(null);
  const [phoneNumber, setUserPhoneNumber] = useState<String | null>(null);

  return (
    <AppStateContext.Provider value={{ mode, name, phoneNumber, setMode, setUserName, setUserPhoneNumber }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within a AppStateProvider');
  }
  return context;
};