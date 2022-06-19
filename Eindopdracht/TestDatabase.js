import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('db.testDb') // returns Database object

class TestDatabase extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        data: null
      }
      // Check if the items table exists if not create it
      db.transaction(tx => {
        tx.executeSql(
          'CREATE TABLE IF NOT EXISTS items (id INTEGER PRIMARY KEY AUTOINCREMENT, text TEXT, count INT)'
        )
      })
      this.fetchData() // ignore it for now
    }

    fetchData = () => {
        db.transaction(tx => {
          // sending 4 arguments in executeSql
          tx.executeSql('SELECT * FROM items', null, // passing sql query and parameters:null
            // success callback which sends two things Transaction object and ResultSet Object
            (txObj, { rows: { _array } }) => this.setState({ data: _array }),
            // failure callback which sends two things Transaction object and Error
            (txObj, error) => console.log('Error ', error)
            ) // end executeSQL
        }) // end transaction
      }

    newItem = () => {
        db.transaction(tx => {
          tx.executeSql('INSERT INTO items (text, count) values (?, ?)', ['gibberish', 0],
            (txObj, resultSet) => this.setState({ data: this.state.data.concat(
                { id: resultSet.insertId, text: 'gibberish', count: 0 }) }),
            (txObj, error) => console.log('Error', error))
        })
    }

    increment = (id) => {
        db.transaction(tx => {
          tx.executeSql('UPDATE items SET count = count + 1 WHERE id = ?', [id],
            (txObj, resultSet) => {
              if (resultSet.rowsAffected > 0) {
                let newList = this.state.data.map(data => {
                  if (data.id === id)
                    return { ...data, count: data.count + 1 }
                  else
                    return data
                })
                this.setState({ data: newList })
              }
            })
        })
    }

    delete = (id) => {
        db.transaction(tx => {
          tx.executeSql('DELETE FROM items WHERE id = ? ', [id],
            (txObj, resultSet) => {
              if (resultSet.rowsAffected > 0) {
                let newList = this.state.data.filter(data => {
                  if (data.id === id)
                    return false
                  else
                    return true
                })
                this.setState({ data: newList })
              }
            })
        })
    }

    render() {
      return (
          <View style={styles.container}>
          <Text>Add Random Name with Counts</Text>
          <TouchableOpacity onPress={this.newItem} style={styles.green}>
            <Text style={styles.white}>Add New Item</Text>
          </TouchableOpacity>
  
          <ScrollView>
          {
              this.state.data && this.state.data.map(data =>
              (
                  <View key={data.id}>
                  <Text >{data.text} - {data.count}</Text>
                  <TouchableOpacity onPress={() => this.increment(data.id)}>
                      <Text style={styles.boldGreen}> + </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.delete(data.id)}>
                      <Text style={styles.boldRed}> DEL </Text>
                  </TouchableOpacity>
                  </View>
              )
          )}
          </ScrollView>
        </View >
      )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    green: {
        backgroundColor: '#00FF00',
    },
    white: {
      color: '#FFFFFF',
    },
    widthfull: {
        
    },
    boldGreen: {
        color: '#00FF00',
        fontWeight: 'bold',
    },
    boldRed: {
        color: '#FF0000',
        fontWeight: 'bold',
    },
});

export {TestDatabase};