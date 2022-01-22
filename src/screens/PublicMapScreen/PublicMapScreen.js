// import React, { useState, useEffect } from 'react'
import * as React from 'react'
import { firebase } from '../../../firebase.js'
import { useState, useEffect } from 'react'
import MapView, { Marker } from 'react-native-maps'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  DatePickerAndroid,
  Pressable,
  Modal,
} from 'react-native'
import { Audio } from 'expo-av'
import styles from './styles'
import * as Location from 'expo-location'

const deltas = {
  latitudeDelta: 0.2,
  longitudeDelta: 0.05,
}

export default function PublicMapScreen({ navigation }) {
  const onRecordPress = () => {
    navigation.navigate('New Recording')
  }

  const [location, setLocation] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [region, setRegion] = useState(null)
  const [audioDetails, setAudioDetails] = useState([])
  // for grabbing from db
  const [sound, setSound] = useState('')
  const [modalVisible, setModalVisible] = useState(true)

  useEffect(() => {
    async function fetchAudio() {
      const detailsRef = firebase.firestore().collection('audio')
      const details = await detailsRef.get()

      const files = []
      details.forEach((audioDoc) => {
        files.push({ id: audioDoc.id, data: audioDoc.data() })
      })
      setAudioDetails(files)
    }
    fetchAudio()
  }, [])
  /*
playSound logic
- audio would be saved with a unique identifier
- also store download link with it? so we can just get that from the db when time to play instead of
- get that from storage
- use it to locate audio
- get download url
- create new sound (redundant?)
- play it
*/
  async function playSound(uri) {
    try {
      console.log('Loading sound')
      // the uri is the download link of the audio file
      const { sound } = await Audio.Sound.createAsync({
        uri,
      })
      // putting the to-be-played sound on state
      setSound(sound)

      console.log('Playing sound')
      await sound.playAsync()
    } catch (error) {
      console.error(error)
    }
  }
  async function stopSound() {
    try {
      console.log('Stopping')
      sound.stopAsync()
    } catch (error) {
      console.error(error)
    }
  }

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
    //call setErrorMsg again and set to empty string???
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
          // causes map to be unable to move - maybe needs an onRegionChange
          // region={region}
          style={styles.map}
          showsUserLocation={true}
          zoomEnabled={true}
        >
          {audioDetails.map((file) => (
            <Marker
              onPress={() => {
                playSound(file.data.downloadUrl)
              }}
              onDeselect={stopSound}
              key={file.data.userId}
              title={file.data.title}
              description={file.data.description}
              coordinate={{
                latitude: file.data.location.latitude,
                longitude: file.data.location.longitude,
                ...deltas,
              }}
            />
          ))}
        </MapView>
      ) : (
        <MapView
          initialRegion={{
            latitude: 40.73061,
            longitude: -73.97,
            ...deltas,
          }}
          zoomEnabled={true}
          style={styles.map}
        >
          {audioDetails.map((file) => (
            <Marker
              onPress={() => {
                playSound(file.data.downloadUrl)
              }}
              onDeselect={stopSound}
              key={file.data.userId}
              title={file.data.title}
              description={file.data.description}
              coordinate={{
                latitude: file.data.location.latitude,
                longitude: file.data.location.longitude,
                ...deltas,
              }}
            />
          ))}
        </MapView>
      )}
      {/* Modal start */}
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible)
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Welcome to City Diary! {'\n'} Tap on a red marker for a
                surprise!
              </Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Got it!</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
      {/* Modal end */}
      <Text style={styles.paragraph}>{text}</Text>
      <TouchableOpacity
        style={styles.recordButton}
        onPress={() => onRecordPress()}
      >
        <Text style={styles.buttonTitle}>Record</Text>
      </TouchableOpacity>
    </View>
  )
}
