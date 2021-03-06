import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, Button, TouchableOpacity, ScrollView, Share } from 'react-native';
import { useTheme } from '../themes/themeProvider';
import { openDatabase } from 'expo-sqlite';
import NetInfo from '@react-native-community/netinfo';

import { Form } from './Form.js'
import { Edit } from './Edit.js'

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
  const [forceUpdate] = useForceUpdate();

  let internet = null;

  //Check if WiFI is available to load the fetch
  const checkWifi = NetInfo.addEventListener(state => {
    internet = state.isConnected
  });

  //Check constantly for WiFi or any internet connection
  useEffect(checkWifi);

  //Fetching the data from the web as JSON
  const loadJSON = () => {
    fetch("https://stud.hosted.hr.nl/1019766/webservice/hobbyshop.json")
        .then(res => res.json())
        .then(data => setItems(data.items))
        .catch(error => console.log(error))
  }

  //Render the page again after deleting a note
  function useForceUpdate() {
    const [value, setValue] = useState(0);
    return [() => setValue(value + 1), value];
  }

  //Reload the pafe after pressing the button
  const reload = () => {
    forceUpdate()
  }

  //Share the selected note to some one
  const onShare = async (noteText) => {
    try {
      const result = await Share.share({
        message: noteText,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  //Delete the selected note from the database
  const deleteNote = (noteId) => {
    db.transaction(
      (tx) => {
        tx.executeSql("delete from notes where id = ?", [noteId]);
        tx.executeSql("select * from notes", [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      },
      null,
      forceUpdate
    );
  };

  //Getting the notes data for each list item
  const RenderNotes = ({ data }) => {
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
        <Text style={[styles.titleText, { color: theme.textColor }]}>Notes</Text>
        {notes.map(({ key, id, itemId, noteText }) => (
          <View style={styles.note}>
            <Text style={[{color: theme.notesBox.textColor}]} key={key}>{noteText}</Text>
            <Button 
              title='Edit'
              style={styles.buttons}
              onPress={() => navigation.navigate('Edit', { screen: Edit, id: id, noteText: noteText })} 
              options={{ headerShown: false }}
            />
            <Button 
              title="Delete" 
              style={styles.buttons}
              onPress={() => {deleteNote(id);}} 
            />
            <Button 
              title="Share" 
              style={styles.buttons}
              onPress={() => {onShare(noteText)}}  
            />
          </View>
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
          <Text style={[styles.item, { color: theme.textColor }]}>{item.description}</Text>
          <Button 
            title='+ Add note'
            onPress={() => navigation.navigate('Form', { screen: Form, id: item.id, title: item.title})} 
            options={{ headerShown: false }}
          />
          <ScrollView>
            <RenderNotes 
              data={item.id}
            />
          </ScrollView>
        </ScrollView>
      </View>
    )
  }

  //Perform the fetching of list data only once
  useEffect(loadJSON, [])

  //If user has internet, then fetch data and render that in
  if(internet === true) {
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
  } else {
    //If no internet, then don't fetch and give a warning
    return (
      <View style={styles.container}>
        <Text>Sorry, it seems like you have no internet connection at the moment :c</Text>
        <Text>To use this function you are required to have an internet connection</Text>
        <Button 
            title="Reload page" 
            onPress={() => {reload();}} 
        />
      </View>
    );
  }
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
      textAlign: 'center',
      padding: 5,
      margin: 10,
    },
    titleText: {
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 'bold',
      paddingTop: 10,
      paddingBottom: 10,
    },
    notes: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    note: {
      flexDirection: "row",
      fontSize: 20,
    },
    buttons: {
      paddingBottom: 10,
    },
});

//Export the List so it can be found by the navigation
export {List};