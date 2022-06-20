import { useState, useEffect } from 'react';
import { Button, Platform, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useTheme } from './themes/themeProvider';
import * as SQLite from 'expo-sqlite';

import { List } from "./List";

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

const Form = ({ navigation }) => {
    const route = useRoute();
    const {theme} = useTheme();
    const { screen, id, title } = route.params;
    const [text, setText] = useState(null);
  
    useEffect(() => {
      db.transaction((tx) => {
        tx.executeSql(
          "create table if not exists notes (id integer primary key not null, itemId int, noteText text);"
        );
      });
    }, []);
  
    const add = (text) => {
      // is text empty?
      if (text === null || text === "") {
        return false;
      }
  
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
                        title='Go back'
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

export {Form};