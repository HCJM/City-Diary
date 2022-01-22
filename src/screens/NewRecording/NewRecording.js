import * as React from 'react'
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native'
import { Audio } from 'expo-av'
import { useAuth } from '../../context/AuthContext'
import styles from './styles'

export default function NewRecording({ navigation }) {
  const { currentUser } = useAuth()
  const [recording, setRecording] = React.useState()

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
    console.log('Stopped recording...')
    console.log('USER recording is -->>', currentUser)
    setRecording(undefined)
    await recording.stopAndUnloadAsync()
    const uri = recording.getURI()
    console.log('Recording stopped and stored at', uri)
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
            navigation.navigate('RecordingDetails')
          }}
        >
          <Text>Done</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
