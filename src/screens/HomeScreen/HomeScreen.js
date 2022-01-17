import React, { useEffect, useState } from 'react'
import {
  FlatList,
  Keyboard,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import styles from './styles'
import { firebase } from '../../../firebase.js'

//maybe this is the list view of all personal diary audio entries??

export default function HomeScreen(props) {
  const [audioFile, setAudioFile] = useState('')
  const [audioTitle, setAudioTitle] = useState('')
  const [audioDescription, setAudioDescription] = useState('')
  const [userAudio, setUserAudio] = useState([])

  const audioRef = firebase.firestore().collection('audio')
  //Had to inspect props here to see how to access logged in user info
  const userId = props.route.params.user.id
  const userName = props.route.params.user.userName
  // const userLocation = props.route.params.user.coords.latLong???

  useEffect(() => {
    audioRef
      .where('userId', '==', userId)
      .orderBy('createdAt', 'desc')
      .onSnapshot(
        (querySnapshot) => {
          const updatedUserAudioFiles = []
          querySnapshot.forEach((doc) => {
            userAudio = doc.data()
            userAudio.id = doc.id
            updatedUserAudioFiles.push(userAudio)
          })
          setUserAudio(updatedUserAudioFiles)
        },
        (error) => {
          console.log(error)
        }
      )
  }, [])

  const onSaveButtonPress = () => {
    if (audioFile) {
      const timestamp = firebase.firestore.FieldValue.serverTimestamp()
      const data = {
        audioFile: audioFile,
        title: audioTitle,
        description: audioDescription,
        userName: userName,
        userId: userId,
        timestamp: timestamp,
        // location: userLocation,
        // isPrivate: true
      }
      audioRef
        .add(data)
        .then((_doc) => {
          setAudioFile('')
          Keyboard.dismiss()
        })
        .catch((error) => {
          alert(error)
        })
    }
  }

  const renderAudio = ({ item, index }) => {
    return (
      <View style={styles.audioContainer}>
        <Text style={styles.audioText}>
          {index}. {item.title}
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add new audio file"
          placeholderTextColor="#aaaaaa"
          onChangeText={(filePath) => setAudioFile(filePath)}
          value={audioFile}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Add audio title"
          placeholderTextColor="#aaaaaa"
          onChangeText={(title) => setAudioTitle(title)}
          value={audioTitle}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Add audio description"
          placeholderTextColor="#aaaaaa"
          onChangeText={(description) => setAudioDescription(description)}
          value={audioDescription}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.button} onPress={onSaveButtonPress}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
      </View>
      {userAudio && (
        <View style={styles.listContainer}>
          <FlatList
            data={userAudio}
            renderItem={renderAudio}
            keyExtractor={(item) => item.id}
            removeClippedSubviews={true}
          />
        </View>
      )}
    </View>
  )
}
