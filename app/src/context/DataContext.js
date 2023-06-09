import { useState, createContext } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [appData, setAppData] = useState({ 
    latitude: '',
    longitude: '',
    capturedImages: [],
    currentTime: '',
    lastScreen: '',
    spotsampleScreen:'',
    actionableScreen:'',
  });

  // console.log('CONTEXT Images:', appData.capturedImages);

  return (
    <DataContext.Provider value={{ appData, setAppData }}>
      {children}
    </DataContext.Provider>
  );
};
