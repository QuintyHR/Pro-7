import { StyleSheet, View, Text, Button } from 'react-native';
import { useTheme } from './themes/themeProvider';

export function Settings() {
  const {theme, updateTheme} = useTheme();
  const changeTheme = () => updateTheme(theme.themeMode);

  return (
    <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <Text style={[styles.text, {color: theme.textColor}]}>Settings screen</Text>
      <Button title={theme.themeMode !== 'dark' ? 'darkmode' : 'lightmode'}
              onPress={changeTheme}
              color={theme.nav.backgroundColor}
      />
    </View>
  );
}

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