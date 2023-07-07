import { useState, createContext } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [appData, setAppData] = useState({ 
    latitude: '',
    longitude: '',
    capturedImages: [],
    currentTime: '',
    lastScreen: '',
  });

  // console.log('Captured Images:', appData.capturedImages);

  return (
    <DataContext.Provider value={{ appData, setAppData }}>
      {children}
    </DataContext.Provider>
  );
};
