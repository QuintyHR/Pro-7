import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { useTheme } from '../themes/themeProvider.js';

//The Home component to load in and exporting it for the navigation
export function Home() {
    const {theme} = useTheme();

    //Return the View for the Home component 
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={[styles.title, { color: theme.textColor }]}>Hobby Reminder</Text>
            <Text style={[{ color: theme.textColor }]}>The app to remember where you bought all your stuff</Text>
        </View>
      </SafeAreaView>
    );
}

//Styling for the Home component
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      margin: 20,
    },
});
