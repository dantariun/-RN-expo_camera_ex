import { create } from 'zustand';

interface PhotoState {
    photoData: { uri: string; base64: string | null } | null;
    setPhotoData: (data: PhotoState['photoData']) => void;
    clearPhoto: () => void;
}

export const usePhotoStore = create<PhotoState>((set) => ({
    photoData: null,
    setPhotoData: (data) => set({ photoData: data }),
    clearPhoto: () => set({ photoData: null }),
}));