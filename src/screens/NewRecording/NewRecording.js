import { Audio } from 'expo-av'
import * as React from 'react'
import { useState } from 'react'
import { Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import styles from './styles'
import RecordingDetails from './RecordingDetails'

export default function NewRecording() {
  const [recording, setRecording] = useState(null)
  const [sound, setSound] = React.useState()
  const [done, setDone] = useState(false)
  const [userRecording, setUserRecording] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)

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
      setDone(true)
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
          style={done ? styles.button : styles.hidden}
          onPress={() => {
            recording ? stopRecording() : null
            setModalVisible(!modalVisible)
          }}
        >
          <Text>Done</Text>
        </TouchableOpacity>

        <RecordingDetails
          userRecording={userRecording}
          visible={modalVisible}
          upload={() => {
            setDone(false)
          }}
          closeModal={() => {
            setModalVisible(false)
          }}
        />
      </View>
    </SafeAreaView>
  )
}
