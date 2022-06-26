import { useState, useEffect } from 'react';
import { Button, Platform, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useTheme } from './themes/themeProvider';
import { openDatabase } from 'expo-sqlite';

import { List } from "./List";

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

//The Form component to load in
const Form = ({ navigation }) => {
    const route = useRoute();
    const {theme} = useTheme();
    const { screen, id, title } = route.params;
    const [text, setText] = useState(null);
  
    //If table doesn't exist create a new one for notes
    useEffect(() => {
      db.transaction((tx) => {
        tx.executeSql(
          "create table if not exists notes (id integer primary key not null, itemId int, noteText text);"
        );
      });
    }, []);
  
    //If text if empty, don't add to the database
    const add = (text) => {
      // is text empty?
      if (text === null || text === "") {
        return false;
      }
  
      //Else add all the info needed to the database
      db.transaction(
        (tx) => {
          tx.executeSql("insert into notes (itemId, noteText) values (?, ?)", [id, text]);
          tx.executeSql("select * from notes", [], (_, { rows }) =>
            console.log(JSON.stringify(rows))
          );
        },
        null
      );
    };
  
    //Return the Form so the user can fill it in
    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <View>
                {Platform.OS === "web" ? (
                <View
                    style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                >
                    <Text style={styles.heading}>
                    Expo SQlite is not supported on web!
                    </Text>
                </View>
                ) : (
                <>
                    <View style={styles.flexRow}>
                    <TextInput
                        onChangeText={(text) => setText(text)}
                        placeholder="Write your note here"
                        style={styles.input}
                        value={text}
                    />
                    <Button 
                        title="Save" 
                        onPress={() => { 
                          add(text);
                          setText(null);
                        }} 
                    />
                    <Button 
                        title="Go back"
                        onPress={() => navigation.navigate('List', { screen: List})} 
                        options={{ headerShown: false }}
                    />
                    </View>
                </>
                )}
            </View>
        </SafeAreaView>
    );
}

//Styling for the Form component
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

//Export the Form so it can be found by the navigation
export {Form};