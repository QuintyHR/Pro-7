import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export function Map() {
    const [location, setLocation] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.01,
        longitudeDelta: 0.001,
    });
    const [errorMsg, setErrorMsg] = useState(null);
    const [markers, setMarkers] = useState([])
  
    useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        let locationSelf = await Location.getCurrentPositionAsync({});
        setLocation(locationSelf.coords);
      })();
    }, []);
  
    let text = 'Waiting...';
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      console.log(location)
      text = JSON.stringify(location);
    }

    const loadJSON = () => {
        fetch("https://stud.hosted.hr.nl/1019766/webservice/hobbyshop.json")
            .then(res => res.json())
            .then(data => setMarkers(data.items))
            .catch(error => console.log(error))
    }

    const markerItems = markers.map((marker, index) => {
        return <Marker
          key={index}
          coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
          title={marker.title}
          description={marker.description}
        >
        </Marker >
    })

    useEffect(loadJSON, [])
  
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>{text}</Text>
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
          <Marker coordinate={location} />
          {markerItems}
        </MapView>
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
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
});