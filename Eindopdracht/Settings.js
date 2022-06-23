import { StyleSheet, View, Text, Button } from 'react-native';
import { useTheme } from './themes/themeProvider';

//The Settings component to load in and exporting it for the navigation
export function Settings() {
  const {theme, updateTheme} = useTheme();
  const changeTheme = () => updateTheme(theme.themeMode);

  //Return button to switch to dark or light mode on the device
  return (
    <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <Text style={[styles.text, {color: theme.textColor}]}>Settings screen</Text>
      <Button title={theme.themeMode !== 'dark' ? 'darkmode' : 'lightmode'}
              onPress={changeTheme}
              backgroundColor={theme.nav.backgroundColor}
      />
    </View>
  );
}

//Styling for the Form component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});