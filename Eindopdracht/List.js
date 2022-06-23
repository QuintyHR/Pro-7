import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, Button, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from './themes/themeProvider';
import { openDatabase } from 'expo-sqlite';

import { Form } from './Form.js'

//Open the database on the device
function openDB() {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  }

  const db = openDatabase("db.db");
  return db;
}

const db = openDB();

//The List component to load in
const List = ({ navigation }) => {
  const {theme} = useTheme();
  const [items, setItems] = useState([]);

  //Fetching the data from the web as JSON
  const loadJSON = () => {
    fetch("https://stud.hosted.hr.nl/1019766/webservice/hobbyshop.json")
        .then(res => res.json())
        .then(data => setItems(data.items))
        .catch(error => console.log(error))
  }

  //Getting the notes data for each list item
  const RenderNote = ({ data }) => {
    const [notes, setNotes] = useState(null);

    //Getting the data from the database where itemId is wqual to the list id
    useEffect(() => {
      db.transaction((tx) => {
        tx.executeSql("select * from notes where itemId = ?", 
        [data], 
        (_, { rows: { _array } })  => setNotes(_array)
        );
      });
    }, []);
  
    //Found nothing? Then return nothing
    if (notes === null || notes.length === 0) {
      return null;
    }

    //Return all the found notes of that list item id
    return (
      <View style={[styles.notes]}>
        <Text>Notes</Text>
        {notes.map(({ id, itemId, noteText }) => (
            <Text>{noteText}</Text>
        ))}
      </View>
    )
  }

  //Render all the items in the list using the data from the fetch
  function renderItem ({ item }) {
    return (
      <View style={[styles.item, { backgroundColor: theme.listBox.backgroundColor }]}>
        <ScrollView>
          <Text style={[styles.titleText, { color: theme.textColor }]}>{item.title}</Text>
          <Text style={[{ color: theme.textColor }]}>{item.description}</Text>
          <Button 
            title='+ Add note'
            onPress={() => navigation.navigate('Form', { screen: Form, id: item.id, title: item.title})} 
            options={{ headerShown: false }}
          />
          <Text style={[styles.item, { color: theme.textColor }]}>Notes</Text>
          <ScrollView>
            <RenderNote 
              data={item.id}
            />
          </ScrollView>
        </ScrollView>
      </View>
    )
  }

  //Perform the fetching of list data only once
  useEffect(loadJSON, [])

  //Return the View for the List component
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

//Styling for the List component
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 100,
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
    notes: {
      backgroundColor: '#fff',
    },
});

//Export the List so it can be found by the navigation
export {List};