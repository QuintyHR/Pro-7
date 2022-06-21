import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, SafeAreaView, Button, TouchableOpacity, ScrollView } from 'react-native';
import { useTheme } from './themes/themeProvider';
import * as SQLite from 'expo-sqlite';

import { Form } from './Form.js'

function openDatabase() {
  if (Platform.OS === "web") {
    return {
      transaction: () => {
        return {
          executeSql: () => {},
        };
      },
    };
  }

  const db = SQLite.openDatabase("db.db");
  return db;
}

const db = openDatabase();

const List = ({ navigation }) => {
  const {theme} = useTheme();
  const [items, setItems] = useState([]);

  const loadJSON = () => {
    fetch("https://stud.hosted.hr.nl/1019766/webservice/hobbyshop.json")
        .then(res => res.json())
        .then(data => setItems(data.items))
        .catch(error => console.log(error))
  }

  const RenderNote = ({ data }) => {
    const [notes, setNotes] = useState(null);

    useEffect(() => {
      db.transaction((tx) => {
        tx.executeSql("select * from notes where itemId = ?", 
        [data], 
        (_, { rows: { _array } })  => setNotes(_array)
        );
      });
    }, []);
  
    if (notes === null || notes.length === 0) {
      return null;
    }

    return (
      <View style={[styles.notes]}>
        <Text>Notes</Text>
        {notes.map(({ id, itemId, noteText }) => (
            <Text>{noteText}</Text>
        ))}
      </View>
    )
  }

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
    note: {
      backgroundColor: '#fff',
    },
});

export {List};