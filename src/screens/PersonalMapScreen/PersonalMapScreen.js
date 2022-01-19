import * as React from 'react'
import MapView from 'react-native-maps'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import styles from './styles'

//get user location authorization and use that to set region!

export default function PersonalMapScreen() {
  const onRecordPress = () => {}
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
      <TouchableOpacity style={styles.button} onPress={() => onRecordPress()}>
        <Text style={styles.buttonTitle}>Record</Text>
      </TouchableOpacity>
    </View>
  )
}
