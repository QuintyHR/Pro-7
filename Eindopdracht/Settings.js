import { StyleSheet, Text, View, Button } from 'react-native';
import * as React from 'react';
import Switch from 'expo-dark-mode-switch';

export function Settings() {
  const [value, setValue] = React.useState(true);

  return (
    <View style={styles.container}>
      <Text>We are on Light mode!</Text>
      <Button title="Switch to Dark Mode" onPress={() => null} />
      {/* <Switch value={value} onChange={value => setValue(value)} />; */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});