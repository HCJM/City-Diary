import { Audio } from 'expo-av'
import * as Location from 'expo-location'
import * as React from 'react'
import { useState } from 'react'
import {
  Image,
  Modal,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { firebase } from '../../../firebase.js'
import { useAuth } from '../../context/AuthContext'
import styles from './styles'

export default function NewRecording({ navigation }) {
  const currentUser = useAuth().currentUser || {}
  const [recording, setRecording] = useState()
  const [sound, setSound] = React.useState()
  const [userRecording, setUserRecording] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [title, onChangeTitle] = React.useState('')
  const [description, onChangeDescription] = React.useState('')
  const fileName = title.replace(/([^a-z0-9]+)/gi, '')
  const uid = currentUser.id

  async function startRecording() {
    try {
      console.log('Requesting permissions...')
      await Audio.requestPermissionsAsync()
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      })
      console.log('Starting recording...')
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      )
      setRecording(recording)
      console.log('Recording started')
    } catch (err) {
      console.error('Failed to start recording', err)
    }
  }

  async function stopRecording() {
    try {
      console.log('Stopped recording...')
      setRecording(undefined)
      await recording.stopAndUnloadAsync()
      setUserRecording(recording.getURI())
    } catch (error) {
      console.error(error)
    }
  }

  async function playbackRecording() {
    console.log('Loading your recording...')
    const { sound } = await Audio.Sound.createAsync({ uri: userRecording })
    setSound(sound)

    console.log('Playing your recording...')
    await sound.playAsync()
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading your recording...')
          sound.unloadAsync()
        }
      : undefined
  }, [sound])

  async function storeAudio() {
    try {
      // creating a blob
      const blob = await new Promise((resolve, reject) => {
        // opening a new request
        const xhr = new XMLHttpRequest()
        // once request is recieved
        xhr.onload = () => {
          try {
            resolve(xhr.response)
          } catch (error) {
            console.error('error xhr.onload:', error)
          }
        }
        xhr.onerror = (error) => {
          console.error(error)
          reject(new TypeError('Network request failed'))
        }
        xhr.responseType = 'blob'
        // request type, content, asynchronous
        xhr.open('GET', userRecording, true)
        // request body
        xhr.send(null)
      })
      if (blob != null) {
        const uriParts = userRecording.split('.')
        const fileType = uriParts[uriParts.length - 1]
        firebase
          .storage()
          .ref()
          .child(`${uid}.${fileName}.${fileType}`)
          .put(blob, {
            contentType: `audio/${fileType}`,
          })
          .then(() => {
            console.log('Sent!')
            sendToDatabase()
          })
          .catch((e) => console.log('error!:', e))
      } else {
        console.log('erroor with blob')
      }
    } catch (error) {
      console.log('error!!:', error)
    }
  }

  async function sendToDatabase() {
    try {
      let location = await Location.getCurrentPositionAsync({})

      const downloadUrl = await firebase
        .storage()
        .ref()
        .child(`${uid}.${fileName}.m4a`)
        .getDownloadURL()

      const instance = firebase.firestore().collection('audio')
      instance.add({
        title,
        description,
        isPrivate: false,
        uploadedAt: new Date(),
        userId: uid,
        username: currentUser.userName,
        downloadUrl,
        location: new firebase.firestore.GeoPoint(
          location.coords.latitude,
          location.coords.longitude
        ),
      })
      console.log('Added!')
    } catch (error) {
      console.log(error)
    }
  }

  async function onModalExit() {
    onChangeTitle('')
    onChangeDescription('')
  }

  return (
    <SafeAreaView>
      <View>
        <Image
          style={styles.image}
          source={require('../../../assets/plainlogo.png')}
        />
        <Text style={styles.text}> 00 : 00 : 00 </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={recording ? stopRecording : startRecording}
        >
          <Text>Start Recording / Stop </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text>Start Over</Text>
        </TouchableOpacity>

        <Text style={styles.text}> 00 : 00 : 00 / 00 : 00 : 00</Text>

        <TouchableOpacity style={styles.button} onPress={playbackRecording}>
          <Text>Play</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            recording ? stopRecording() : null
            setModalVisible(!modalVisible)
          }}
        >
          <Text>Done</Text>
        </TouchableOpacity>
      </View>
      {/* Modal Start */}
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          // onRequestClose={() => {
          //   setModalVisible(!modalVisible)
          // }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Tell us about this clip!</Text>
              <TextInput
                style={styles.input}
                onChangeText={onChangeTitle}
                placeholder="Give me a title"
                value={title}
              />
              <TextInput
                style={styles.input}
                onChangeText={onChangeDescription}
                placeholder="Description"
                multiline={true}
                value={description}
              />
              <TouchableOpacity
                style={[styles.modalButton, styles.buttonClose]}
                onPress={() => {
                  setModalVisible(!modalVisible)
                  onModalExit()
                  storeAudio()
                  // navigate to personal instead? easy fix
                  navigation.navigate('Public Audio Map')
                }}
              >
                <Text style={styles.textStyle}>Upload</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.buttonClose]}
                onPress={() => {
                  setModalVisible(!modalVisible)
                  onModalExit()
                }}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      {/* Modal End */}
    </SafeAreaView>
  )
}
