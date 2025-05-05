import React, { createContext, useContext, useMemo, useCallback, ReactNode } from 'react';

interface SoundContextType {
  playUiSound: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

interface SoundProviderProps {
  children: ReactNode;
}

export const SoundProvider: React.FC<SoundProviderProps> = ({ children }) => {
  const uiSound = useMemo(() => {
    // Ensure this runs only on the client-side
    if (typeof window !== 'undefined') {
      // Path relative to the public folder
      return new Audio('/ui.wav'); 
    } 
    return null;
  }, []);

  const playUiSound = useCallback(() => {
    if (uiSound) {
      uiSound.currentTime = 0; // Rewind to start
      uiSound.play().catch(error => {
        console.error("Error playing UI sound:", error);
      });
    }
  }, [uiSound]);

  const value = useMemo(() => ({ playUiSound }), [playUiSound]);

  return (
    <SoundContext.Provider value={value}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = (): SoundContextType => {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};