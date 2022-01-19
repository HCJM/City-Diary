// import React, { useState, useEffect } from 'react'
import * as React from 'react'
import { useState, useEffect } from 'react'
import MapView, { Marker } from 'react-native-maps'
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

const deltas = {
  latitudeDelta: 0.2,
  longitudeDelta: 0.05,
}

export default function PublicMapScreen() {
  const onRecordPress = () => {}

  const [location, setLocation] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [region, setRegion] = useState(null)
  const [audio, setAudio] = useState(null)

  const checkPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied')
      return
    }

    let location = await Location.getCurrentPositionAsync({})
    setLocation(location)
    const region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      ...deltas,
    }
    setRegion(region)
  }

  useEffect(() => {
    checkPermission()
  }, [])

  let text = 'Loading...'
  if (errorMsg) {
    text = errorMsg
  } else if (location) {
    // text = JSON.stringify(location);
    text = ''
    // console.log(JSON.stringify(location))
  }
  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          region={region}
          style={styles.map}
          showsUserLocation={true}
          zoomEnabled={true}
        >
          <Marker
            title="Hello"
            description="Hi"
            coordinate={{
              latitude: 40.86419161162663,
              longitude: -73.88101060236843,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        </MapView>
      ) : (
        <MapView
          initialRegion={{
            latitude: 41.39508,
            longitude: -73.475291,
            ...deltas,
          }}
          zoomEnabled={true}
          style={styles.map}
        >
          <Marker
            title="Hello"
            description="Hi"
            coordinate={{
              latitude: 40.86419161162663,
              longitude: -73.88101060236843,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        </MapView>
      )}
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
