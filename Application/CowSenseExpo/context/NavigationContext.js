// context/NavigationContext.js
import React, { createContext, useState, useContext } from 'react';

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState({
    vet: 'Patients',
    farmer: 'Dashboard',
  });

  const updateActiveTab = (role, tab) => {
    setActiveTab((prev) => ({
      ...prev,
      [role]: tab,
    }));
  };

  return (
    <NavigationContext.Provider value={{ activeTab, updateActiveTab }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigationContext = () => useContext(NavigationContext);