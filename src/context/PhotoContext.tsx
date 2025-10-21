import React, { createContext, ReactNode, useState } from 'react';

interface PhotoData {
  uri: string | null;
  base64: string | null;
}

interface PhotoContextType {
  photoData: PhotoData | null;
  setPhotoData: (data: PhotoData | null) => void;
}

export const PhotoContext = createContext<PhotoContextType | undefined>(undefined);

export const PhotoProvider = ({ children }: { children: ReactNode }) => {
  const [photoData, setPhotoData] = useState<PhotoData | null>(null);

  return (
    <PhotoContext.Provider value={{ photoData, setPhotoData }}>
      {children}
    </PhotoContext.Provider>
  );
};