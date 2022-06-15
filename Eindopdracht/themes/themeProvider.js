import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet } from 'react-native';
import { darkTheme, defaultTheme } from './theme';

// Changing between dark and light themes, also putting it in Async
const ThemeContext = createContext();
const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(defaultTheme);
    const [isLoadingTheme, setIsLoadingTheme] = useState(true);

    const findOldTheme = async() => { 
        const themeMode = await AsyncStorage.getItem('themeMode');
        if(themeMode !== null) {
            themeMode === 'default' ? setTheme(defaultTheme) : setTheme(darkTheme);
            setIsLoadingTheme(false);
        }
        setIsLoadingTheme(false);
    }
    const updateTheme = currentThemeMode => {
        const newTheme = currentThemeMode === 'default' ? darkTheme : defaultTheme;
        setTheme(newTheme);
        AsyncStorage.setItem('themeMode', newTheme.themeMode);
    }

    useEffect(() => { findOldTheme(); }, []);

    return (
        <ThemeContext.Provider value={{ theme, isLoadingTheme, updateTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext)

const styles = StyleSheet.create({
    container: {

    },
});

export default ThemeProvider;