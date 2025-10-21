import { DiagnosisMode } from '@/constants/DiagnosisModes';
import { create } from 'zustand';

interface AppState {
    mode: DiagnosisMode | null;
    name: string | null;
    phoneNumber: string | null;
    setMode: (mode: DiagnosisMode | null) => void;
    setUserName: (name: string | null) => void;
    setUserPhoneNumber: (phoneNumber: string | null) => void;
}

export const useAppStateStore = create<AppState>((set) => ({
    mode: null,
    name: null,
    phoneNumber: null,

    setMode: (newMode) => set({ mode: newMode }),
    setUserName: (newName) => set({ name: newName }),
    setUserPhoneNumber: (newPhoneNumber) => set({ phoneNumber: newPhoneNumber }),
}));