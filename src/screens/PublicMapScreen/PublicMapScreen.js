import { useIsFocused } from '@react-navigation/native'
import { Audio } from 'expo-av'
import * as Location from 'expo-location'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { Modal, Pressable, Text, TouchableOpacity, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { firebase } from '../../../firebase.js'
import { useAuth } from '../../context/AuthContext'
import SignInPrompt from './SignInPromptModal.js'
import styles from './styles'

// deltas control how much of the map to display. The amount of 'zoom'.
const deltas = {
  latitudeDelta: 0.2,
  longitudeDelta: 0.05,
}

//initial map location view
const NYC_Coordinates = {
  latitude: 40.73061,
  longitude: -73.97,
}


export default function PublicMapScreen({ navigation }) {
  const [open, setOpen] = useState(false)
  const [location, setLocation] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [audioDetails, setAudioDetails] = useState([])
  // for grabbing from db
  const [sound, setSound] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)
  const [modalVisible, setModalVisible] = useState(true)
  const [userRegion, setUserRegion] = useState(null)

  // currentUser is an object with these properties: email, firstName, id, lastName, userName
  const currentUser = useAuth().currentUser || {}

  const onRecordPress = () => {
    if (currentUser.id) {
      navigation.navigate('New Recording')
    } else {
      setOpen(true)
    }
  }

  const isFocused = useIsFocused()

  useEffect(() => {
    const checkPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied')
        return
      }
      let location = await Location.getCurrentPositionAsync({})
      setLocation(location)
      const myRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        ...deltas,
      }
      setUserRegion(myRegion)
    }
    checkPermission()

    async function fetchAudio() {
      const audioRef = firebase.firestore().collection('audio')
      const details = await audioRef.get()

      const markerContent = []
      details.forEach((audioDoc) => {
        markerContent.push({ id: audioDoc.id, data: audioDoc.data() })
      })
      setAudioDetails(markerContent)
    }
    fetchAudio()
  }, [isFocused])

  async function playSound(uri) {
    try {
      if (isPlaying) {
        stopSound()
      }
      console.log('Loading sound')
      // the uri is the download link of the audio file
      const { sound } = await Audio.Sound.createAsync({
        uri,
      })
      setSound(sound)
      setIsPlaying(true)
      console.log('Playing sound')
      await sound.playAsync()
    } catch (error) {
      console.error(error)
    }
  }
  async function stopSound() {
    try {
      console.log('Stopping sound')
      setIsPlaying(false)
      sound.stopAsync()
    } catch (error) {
      console.error(error)
    }
  }

  //renders loading while getting user's location, otherwise empty string
  let text = 'Loading...'
  if (errorMsg) {
    text = errorMsg
  } else if (location) {
    text = ''
  }

  return (
    <View style={styles.container}>
      {location ? (
        <MapView
          initialRegion={userRegion}
          style={styles.map}
          showsUserLocation={true}
          zoomEnabled={true}
        >
          {audioDetails.map((audioDoc) => (
            <Marker
              onPress={() => {
                playSound(audioDoc.data.downloadUrl)
              }}
              onDeselect={stopSound}
              key={audioDoc.id}
              title={audioDoc.data.title}
              description={audioDoc.data.description}
              coordinate={{
                latitude: audioDoc.data.location.latitude,
                longitude: audioDoc.data.location.longitude,
                ...deltas,
              }}
              pinColor={
                audioDoc.data.userId === currentUser.id ? '#000000' : '#FF0000'
              }
            />
          ))}
        </MapView>
      ) : (
        <MapView
          region={{
            ...NYC_Coordinates,
            ...deltas,
          }}
          zoomEnabled={true}
          style={styles.map}
        >
          {audioDetails.map((audioDoc) => (
            <Marker
              onPress={() => {
                playSound(audioDoc.data.downloadUrl)
              }}
              onDeselect={stopSound}
              key={audioDoc.id}
              title={audioDoc.data.title}
              description={audioDoc.data.description}
              coordinate={{
                latitude: audioDoc.data.location.latitude,
                longitude: audioDoc.data.location.longitude,
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
                Welcome to City Diary! {'\n'} {'\n'}Tap on a red marker for a
                surprise! {'\n'} {'\n'} Tap elsewhere to stop playback
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
      <View style={styles.centeredView}>
        <Modal visible={open} transparent={true}>
          <SignInPrompt
            props={navigation}
            open={open}
            onClose={() => setOpen(false)}
          />
        </Modal>
      </View>
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
