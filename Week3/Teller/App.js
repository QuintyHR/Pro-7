import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [counter, setCounter] = useState(0)

  if(counter < 0) {
    Alert.alert(
      "Alert",
      "Number cannot be lower than 0",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
    setCounter(0)
  }

  return (
    <View style={styles.container}>
      <Text>Counter app</Text>
      <Text>{counter}</Text>
      <Button
        onPress={() => setCounter(counter + 1)}
        title="+1"
        color="#841584"
        accessibilityLabel="Add counter"
      />
      <Button
        onPress={() => setCounter(counter - 1)}
        title="-1"
        color="#841584"
        accessibilityLabel="Subtract counter"
      />
      <Button
        onPress={() => setCounter(0)}
        title="Reset Counter"
        color="#841584"
        accessibilityLabel="Reset counter"
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
