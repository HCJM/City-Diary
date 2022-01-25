import * as React from 'react'
import {
  Dimensions, StyleSheet,
  Text, TouchableOpacity, View
} from 'react-native'
import MapView from 'react-native-maps'
// import styles from './styles'

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
})
