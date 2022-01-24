import * as React from 'react'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import * as Location from 'expo-location'
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native'
import { firebase } from '../../../firebase.js'
import styles from './styles'
import { useNavigation } from '@react-navigation/native'

export default function RecordingDetails({
  visible,
  closeModal,
  userRecording,
}) {
  const currentUser = useAuth().currentUser || {}
  const [title, onChangeTitle] = React.useState('')
  const [description, onChangeDescription] = React.useState('')
  const fileName = title.replace(/([^a-z0-9]+)/gi, '')
  const navigation = useNavigation()

  const uid = currentUser.id

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

      const downloadUrl = await firebase
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
        <Modal animationType="slide" transparent={true} visible={visible}>
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
                  closeModal()
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
                  onModalExit()
                  closeModal()
                }}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  )
}
