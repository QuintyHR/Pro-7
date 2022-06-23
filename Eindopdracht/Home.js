import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { useTheme } from './themes/themeProvider';

//The Home component to load in and exporting it for the navigation
export function Home() {
    const {theme} = useTheme();

    //Return the View for the Home component 
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={[{ color: theme.textColor }]}>Home Screen</Text>
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
});
