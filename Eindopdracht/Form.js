import React from "react";
import { SafeAreaView, StyleSheet, TextInput, View, Text } from "react-native";
import { useTheme } from './themes/themeProvider';

export function Form() {
    const {theme} = useTheme();
    const [text, onChangeText] = React.useState("");

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <View>
                <Text>Voeg hier een notitie toe aan ... </Text>
                <TextInput
                    style={[styles.input, {backgroundColor: theme.input.backgroundColor}, {color: theme.input.textColor}]}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder="Write your note here"
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        width: 300,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
});