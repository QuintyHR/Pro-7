import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, Button } from 'react-native';
import { useTheme } from './themes/themeProvider';

import { Form } from './Form.js'

const List = ({ navigation }) => {
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
      <View style={[styles.item, { backgroundColor: theme.listBox.backgroundColor }]}>
        <Text style={[styles.titleText, { color: theme.textColor }]}>{item.title}</Text>
        <Text style={[{ color: theme.textColor }]}>{item.description}</Text>
        <Button 
          title='+ Add note'
          onPress={() => navigation.navigate('Form', { screen: Form})} 
          options={{ headerShown: false }}
        />
      </View>
    )
  }

  useEffect(loadJSON, [])

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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
    item: {
      padding: 5,
      margin: 10,
    },
    titleText: {
      fontSize: 20,
      fontWeight: 'bold',
      paddingBottom: 10,
    },
});

export {List};