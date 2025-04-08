// App.js
import React from 'react';
import AppNavigator from './navigation/AppNavigator';
import { NavigationProvider } from './context/NavigationContext';

export default function App() {
  return (
    <NavigationProvider>
      <AppNavigator />
    </NavigationProvider>
  );
}