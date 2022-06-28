import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import NetInfo from '@react-native-community/netinfo';
import { useTheme } from '../themes/themeProvider';

//The Map component to load in and exporting it for the navigation
export function Map() {
    const {theme} = useTheme();
    const [location, setLocation] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.01,
        longitudeDelta: 0.001,
    });
    const [errorMsg, setErrorMsg] = useState(null);
    const [markers, setMarkers] = useState([])

    let data = null;

    //Check if WiFI is available to load in the map
    const checkWifi = NetInfo.addEventListener(state => {
      data = state.isConnected
    });

    //Check constantly for WiFi or any internet connection
    useEffect(checkWifi);
  
    //Ask perimission of the users location
    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        //Get the users location
        let locationSelf = await Location.getCurrentPositionAsync({});
        setLocation(locationSelf.coords);
      })();
    }, []);
  
    let text = "Waiting..."
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      console.log(location)
      text = JSON.stringify(location);
    }

    //Fetch all the marker locations 
    const loadJSON = () => {
        fetch("https://stud.hosted.hr.nl/1019766/webservice/hobbyshop.json")
            .then(res => res.json())
            .then(data => setMarkers(data.items))
            .catch(error => console.log(error))
    }

    //Return all marker locations on the map
    const markerItems = markers.map((marker, index) => {

        return <Marker
          key={index}
          coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
          title={marker.title}
          description={marker.description}
          pinColor={'violet'}
        >
        </Marker >
    })

    //Fetch the location data only once
    useEffect(loadJSON, [])
  
    //If users has internet, then load the map
    if(data === true) {
      return (
        <View style={styles.container}>
          <MapView style={styles.map} 
            provider={PROVIDER_GOOGLE}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.001,
            }}
            region={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.001,
            }}
          >
            <Marker 
              coordinate={location} 
              pinColor={'indigo'}
            />
            {markerItems}
          </MapView>
        </View>
      );
    } else {
      //If no internet, then don't load the map
      return (
        <View style={styles.container}>
          <Text>Sorry, it seems like you have no internet connection at the moment :c</Text>
        </View>
      );
    }
}

//Styling for the Map component
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
});