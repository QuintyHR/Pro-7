import React from "react";
import { SafeAreaView, StyleSheet, TextInput, View, Text, Button } from "react-native";
import { useRoute } from '@react-navigation/native';
import { useTheme } from './themes/themeProvider';
import { openDatabase } from "react-native-sqlite-storage";

const db = openDatabase

export function Form() {
    const route = useRoute();
    const {theme} = useTheme();
    const [text, onChangeText] = React.useState("");

    const { screen, id, title } = route.params;

    const addNote = () => {

    }

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <View>
                <Text>Voeg hier een notitie toe aan: {JSON.stringify(title)}</Text>
                <TextInput
                    style={[styles.input, {backgroundColor: theme.input.backgroundColor}, {color: theme.input.textColor}]}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder="Write your note here"
                />
                <Button title="Save" onPress={addNote} />
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