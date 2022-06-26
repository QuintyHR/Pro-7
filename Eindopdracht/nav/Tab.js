import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = ({ color, tab, onPress, icon }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            { icon && <MaterialCommunityIcons name={icon} size={20} color={color} /> }
            <Text style={{ color }}>{tab.name}</Text>
        </TouchableOpacity>
    )
}

//Styling for the Tab component
const styles = StyleSheet.create({
    container: {
      flex: 5,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
    },
});

//Export the tab
export default Tab;