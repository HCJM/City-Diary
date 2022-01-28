import { Audio } from 'expo-av'
import * as React from 'react'
import { useState } from 'react'
import { Text, View, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import styles from './styles'
import RecordingDetails from './RecordingDetails'
import { ScrollView } from 'react-native-gesture-handler'
import LoadingModal from './LoadingModal'

export default function NewRecording() {
  const [recording, setRecording] = useState(null)
  const [sound, setSound] = React.useState()
  const [done, setDone] = useState(false)
  const [userRecording, setUserRecording] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [timeoutID, setTimeoutID] = useState(null)
  const [time, setTime] = useState({ seconds: 0, minutes: 0, hours: 0 })
  const [loading, setLoading] = useState(false)

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
      //const timerPush = setInterval(startTimer, 1000)
      //settimeoutID(timerPush)
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

  const startTimerContext = () => {
    let timerVar = setInterval(startTimer, 1000)
    let totalSeconds = 0
    setTimeoutID(timerVar)
    // console.log(timeoutID)
    function startTimer() {
      //let totalSeconds = 0
      totalSeconds++
      let hour = Math.floor(totalSeconds / 3600)
      let minute = Math.floor((totalSeconds - hour * 3600) / 60)
      let second = totalSeconds - (hour * 3600 + minute * 60)
      setTime({ hours: hour, minutes: minute, seconds: second })
      if (second <= 20) {
        console.log(totalSeconds)
      } else {
        clearInterval(timerVar)
      }
      // let seconds = totalSeconds - (hour * 3600 + minute * 60)
      // console.log(totalSeconds)
      // if (hour < 10) hour = '0' + hour
      // if (minute < 10) minute = '0' + minute
      // if (seconds < 10) seconds = '0' + seconds
    }
  }

  const stopTimeContext = () => {
    clearInterval(timeoutID)
    setTime({ hours: 0, minutes: 0, seconds: 0 })
  }

  const handleRecordingPress = () => {
    if (recording) {
      stopTimeContext()
      stopRecording()
    } else {
      startTimerContext()
      startRecording()
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <Image
            style={styles.image}
            source={require('../../../assets/cityDiary.png')}
          />
          <Text style={styles.text}> {`${time.hours} : ${time.minutes} : ${time.seconds}`} </Text>
          <TouchableOpacity
            style={styles.audioButton}
            onPress={handleRecordingPress}
          >
            <Text style={styles.audioButtonTitle}>Start Recording / Stop </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.audioButton}>
            <Text style={styles.audioButtonTitle}>Start Over</Text>
          </TouchableOpacity>


          <TouchableOpacity
            style={styles.audioButton}
            onPress={playbackRecording}
          >
            <Text style={styles.audioButtonTitle}>Play</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={done ? styles.audioButton : styles.hidden}
            onPress={() => {
              recording ? stopRecording() : null
              setModalVisible(!modalVisible)
            }}
          >
            <Text style={styles.audioButtonTitle}>Done</Text>
          </TouchableOpacity>

          <RecordingDetails
            userRecording={userRecording}
            visible={modalVisible}
            uploadButton={() => {
              setLoading(true)
              setDone(false)
            }}
            closeModal={() => {
              setModalVisible(false)
            }}
            setLoading={setLoading}
            loading={loading}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
