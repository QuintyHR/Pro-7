import { NavigationContainer } from '@react-navigation/native';
import { Navigation } from './nav/Navigation.js';
import React from 'react';
import ThemeProvider from './themes/themeProvider';
import ThemeWrapper from './themes/themeWrapper';

export default function App() {
  return (
    <ThemeProvider>
      <ThemeWrapper>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </ThemeWrapper>
    </ThemeProvider>
  );
}