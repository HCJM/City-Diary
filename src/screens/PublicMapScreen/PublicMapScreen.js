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
  // for playback
  const [audio, setAudio] = useState([])
  // for grabbing from db
  const [sound, setSound] = useState('')
  const [modalVisible, setModalVisible] = useState(true)

  // const storageRef = firebase.storage().ref('climate.wav')
  // *works but does it repeatedly*
  // async function getAudio() {
  //   return await storageRef.getDownloadURL()
  // }
  // *attempt at getting it to only run once*
  // function getAudio() {
  //   Promise.resolve(storageRef.getDownloadURL()).then(function (value) {
  //     console.log(value)
  //   })
  // }
  // const downloadUrl = getAudio()
  // console.log("->>, downloadUrl")
  async function getAudioData() {
    // create a reference to the collection
    const audiosRef = firebase.firestore().collection('audio')

    const audio = await audiosRef.get()
    const files = []
    audio.forEach((audio) => {
      files.push({ id: audio.id, data: audio.data() })
      // console.log(audio.id, '=>', audio.data())
    })
    setAudio(files)
    // const uid = props.route.params.user.id
  }
  getAudioData()
  async function playSound() {
    try {
      console.log('Loading sound')
      // the uri is the download link of the audio file
      const { sound } = await Audio.Sound.createAsync({
        uri: 'https://firebasestorage.googleapis.com/v0/b/citydiary-ec8b6.appspot.com/o/centuryfox.wav?alt=media&token=1a080b9d-770a-4c4f-8a7f-23446dd8e764',
      })
      // putting the to-be-played sound on state
      setSound(sound)

      console.log('Playing sound')
      await sound.playAsync()
    } catch (error) {
      console.log(error)
    }
  }
  async function stopSound() {
    console.log('Stopping')
    sound.stopAsync()
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
          {audio.map((file) => (
            <Marker
              onPress={playSound}
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
          {audio.map((file) => (
            <Marker
              onPress={playSound}
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
            Alert.alert('Modal has been closed.')
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

export const styles = StyleSheet.create({
  // Modal start
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  // Modal end
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
  recordButton: {
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
