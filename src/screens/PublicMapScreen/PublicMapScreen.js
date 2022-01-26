import { useIsFocused } from '@react-navigation/native'
// import { Audio } from 'expo-av'
import * as Location from 'expo-location'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { Modal, Pressable, Text, TouchableOpacity, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { firebase } from '../../../firebase.js'
import { useAuth } from '../../context/AuthContext'
import SignInPrompt from './SignInPromptModal.js'
import styles from './styles'
import MapScreenModule from './MapScreenModule.js'

// deltas control how much of the map to display. The amount of 'zoom'.
const deltas = {
  latitudeDelta: 0.2,
  longitudeDelta: 0.05,
}


export default function PublicMapScreen({ navigation }) {
  const [open, setOpen] = useState(false)
  const [location, setLocation] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [audioDetails, setAudioDetails] = useState([])

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

  const defaultRegionNYC = { latitude: 40.73061, longitude: -73.97, ...deltas }

  useEffect(() => {
    const checkPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied')
        setUserRegion(defaultRegionNYC)
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

  //renders loading while getting user's location, otherwise empty string
  let text = 'Loading...'
  if (errorMsg) {
    text = errorMsg
  } else if (location) {
    text = ''
  }

  return (
    <View style={styles.container}>
      <MapScreenModule
        region={userRegion}
        audioDetails={audioDetails}
        currentUser={currentUser}
      />

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
                Welcome to City Diary! {'\n'} {'\n'}Tap on a map pin to play
                audio. {'\n'} {'\n'} Tap elsewhere to stop audio.
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
