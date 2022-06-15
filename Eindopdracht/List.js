import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, FlatList, SafeAreaView } from 'react-native';
import { useTheme } from './themes/themeProvider';

export function List() {
  const {theme} = useTheme();
  const [items, setItems] = useState([]);

  const loadJSON = () => {
    fetch("https://stud.hosted.hr.nl/1019766/webservice/hobbyshop.json")
        .then(res => res.json())
        .then(data => setItems(data.items))
        .catch(error => console.log(error))
  }

  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <Text>{item.title}</Text>
      </View>
    )
  }

  useEffect(loadJSON, [])

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>List Screen</Text>
        {/* {isFetching ? <ActivityIndicator size="large" color="#FF00FF" /> : ( */}
        <FlatList
          data={items}
          keyExtractor={({ id }) => id}
          renderItem={renderItem}
        />
        {/* )} */}
      </View>
    </SafeAreaView>
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