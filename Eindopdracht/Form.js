import React from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";

export function Form() {
    const [text, onChangeText] = React.useState("");

    return (
        <SafeAreaView>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
                placeholder="Write your note here"
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});