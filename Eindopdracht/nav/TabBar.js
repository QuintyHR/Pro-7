import React, { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useTheme } from '../themes/themeProvider';
import Tab from './Tab';

const {width} = Dimensions.get('screen');

//The TabBar component to load in 
const TabBar = ({state, navigation}) => {
    const [selected, setSelected] = useState('home');
    const {theme} = useTheme();
    const {routes} = state;
    const renderColor = currentTab => currentTab === selected ? theme.nav.active : theme.nav.inActive;
    const handlePress = (activeTab, index) => {
        if(state.index !== index) {
            setSelected(activeTab);
            navigation.navigate(activeTab);
        }
    }

    //Return bottom navigator 
    return (
        <View style={{ position: 'absolute', bottom: 0, width: width}}>
        <View
            style={[styles.container,{ backgroundColor: theme.nav.backgroundColor }]}>
            {routes.map((route, index) => (
            <Tab
                styles={styles.tab}
                tab={route}
                onPress={() => handlePress(route.name, index)}
                color={renderColor(route.name)}
                key={route.key}
            />
            ))}
        </View>
        </View>
    )
};

//Styling for the TabBar component
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingBottom: 30,
        paddingTop: 30,
    },
})

//Export the TabBar
export default TabBar