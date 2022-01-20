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
import { firebase } from '../../../firebase.js'

export default function NewRecording({ navigation }) {
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
  /*
- download file first and then add to storage?
how is it stored?
*/
  async function stopRecording() {
    try {
      console.log('Stopped recording...')
      setRecording(undefined)
      await recording.stopAndUnloadAsync()
      const uri = recording.getURI()
      uploadAudio(uri)
    } catch (error) {
      console.error(error)
    }
  }
  // uri on state
  // instead of details screen, modal instead
  async function uploadAudio(uri) {
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
            console.log('error:', error)
          }
        }
        xhr.onerror = (e) => {
          console.log(e)
          reject(new TypeError('Network request failed'))
        }
        xhr.responseType = 'blob'
        xhr.open('GET', uri, true)
        xhr.send(null)
      })
      if (blob != null) {
        const uriParts = uri.split('.')
        const fileType = uriParts[uriParts.length - 1]
        firebase
          .storage()
          .ref()
          .child(`nameOfTheFile.${fileType}`)
          .put(blob, {
            contentType: `audio/${fileType}`,
          })
          .then(() => {
            console.log('Sent!')
          })
          .catch((e) => console.log('error:', e))
      } else {
        console.log('erroor with blob')
      }
    } catch (error) {
      console.log('error:', error)
    }
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
})
