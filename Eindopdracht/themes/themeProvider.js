import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet } from 'react-native';
import { darkTheme, defaultTheme } from './theme';

//Function for switching between light and dark themes
const ThemeContext = createContext();
const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(defaultTheme);
    const [isLoadingTheme, setIsLoadingTheme] = useState(true);

    //Look at what the current theme is
    const findOldTheme = async() => { 
        const themeMode = await AsyncStorage.getItem('themeMode');
        if(themeMode !== null) {
            themeMode === 'default' ? setTheme(defaultTheme) : setTheme(darkTheme);
            setIsLoadingTheme(false);
        }
        setIsLoadingTheme(false);
    }

    //Change the theme of the page to the current theme selected
    const updateTheme = currentThemeMode => {
        const newTheme = currentThemeMode === 'default' ? darkTheme : defaultTheme;
        setTheme(newTheme);
        AsyncStorage.setItem('themeMode', newTheme.themeMode);
    }

    //Perform looking for the old theme only once 
    useEffect(() => { findOldTheme(); }, []);

    //Return the theme
    return (
        <ThemeContext.Provider value={{ theme, isLoadingTheme, updateTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

//Export the useTheme so it can be loaded in on all pages
export const useTheme = () => useContext(ThemeContext)

//Export the ThemeProvider so it can be found by the App.js
export default ThemeProvider;