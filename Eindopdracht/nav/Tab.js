import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const tab = ({ color, tab, onPress, icon }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            { icon && <MaterialCommunityIcons name={icon} size={20} color={color} /> }
            <Text style={{ color }}>{tab.name}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 5,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
    },
});

export default tab;