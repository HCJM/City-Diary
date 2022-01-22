import * as React from 'react'
import { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Pressable,
  Modal,
  TextInput,
} from 'react-native'
import { Audio } from 'expo-av'
import { firebase } from '../../../firebase.js'
import RecordingDetailsModal from './RecordingDetails.js'
import * as Location from 'expo-location'

export default function NewRecording({ route, navigation }) {
  const [recording, setRecording] = useState()
  const [userRecording, setUserRecording] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [title, onChangeTitle] = React.useState('')
  const [description, onChangeDescription] = React.useState('')
  const fileName = title.replace(/([^a-z0-9]+)/gi, '')
  const { uid } = route.params

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
        xhr.open('GET', userRecording, true)
        xhr.send(null)
      })
      if (blob != null) {
        const uriParts = userRecording.split('.')
        const fileType = uriParts[uriParts.length - 1]
        firebase
          .storage()
          .ref()
          .child(`${fileName}.${uid}.${fileType}`)
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

      const uri = await firebase
        .storage()
        .ref()
        .child(`${fileName}.${uid}.m4a`)
        .getDownloadURL()

      const instance = firebase.firestore().collection('audio')
      instance.add({
        title,
        description,
        isPrivate: false,
        uploadedAt: new Date(),
        userId: firebase.auth().currentUser.uid,
        username: firebase.auth().currentUser.providerData[0].email,
        downloadUrl: uri,
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

        <TouchableOpacity style={styles.button}>
          <Text>Play</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text>Pause</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A9A9A9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'black',
    fontSize: 17,
    textAlign: 'center',
    paddingTop: 30,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 200,
  },
  image: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginTop: 15,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
    padding: 13,
    paddingHorizontal: 20,
    marginTop: 42,
    marginHorizontal: 65,
    width: 250,
  },
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
  modalButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    marginVertical: 15,
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
})
