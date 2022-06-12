import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, FlatList } from 'react-native';

export function List() {
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