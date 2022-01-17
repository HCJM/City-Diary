// import React, { useState, useEffect } from 'react'
import * as React from 'react'
import { useState, useEffect } from 'react'
import MapView from 'react-native-maps'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  DatePickerAndroid,
} from 'react-native'
// import styles from './styles'
import * as Location from 'expo-location'

export default function PublicMapScreen() {
  const onRecordPress = () => {}
  
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const checkPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Please enable permission to access location');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  }

  useEffect(() => {
    checkPermission();
  }, []);

  let text = 'Loading...';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: 40.73061,
          longitude: -73.97,
          latitudeDelta: 0.2,
          longitudeDelta: 0.05,
        }}
        zoomEnabled={true}
        style={styles.map}
      />
      <Text style={styles.paragraph}>{text}</Text>
      <TouchableOpacity style={styles.button} onPress={() => onRecordPress()}>
        <Text style={styles.buttonTitle}>Record</Text>
      </TouchableOpacity>
    </View>
  )
}

export const styles = StyleSheet.create({
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
  button: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: '#DC143C',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    width: 250,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  paragraph: {
    fontSize: 16,
    textAlign: 'center',
    position: 'absolute',
    top: 20,
    backgroundColor: '#fff',
  },
})
