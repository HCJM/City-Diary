import * as React from 'react'
import MapView from 'react-native-maps'
import { StyleSheet, Text, View, Dimensions } from 'react-native'

export default function PublicMapScreen() {
  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: 40.73061,
          longitude: -73.97,
          latitudeDelta: 0.2,
          longitudeDelta: 0.05,
        }}
        style={styles.map}
      />
    </View>
  )
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
})
