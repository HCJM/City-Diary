import * as React from 'react'
import { View } from 'react-native'
import { Audio } from 'expo-av'
import MapView, { Marker } from 'react-native-maps'
import { useState } from 'react'
import styles from './styles'

const deltas = {
  latitudeDelta: 0.2,
  longitudeDelta: 0.05,
}

export default function MapScreenModule({ region, audioDetails, currentUser }) {
  // for grabbing from db
  const [sound, setSound] = useState('')
  const [isPlaying, setIsPlaying] = useState(false)

  const filterOutAllPrivateAudio = audioDetails.filter(
    (audioDoc) => audioDoc.data.isPrivate === false
  )

  const filterOutOthersPrivateAudio = audioDetails.filter(
    (audioDoc) =>
      audioDoc.data.userId === currentUser.id ||
      audioDoc.data.isPrivate === false
  )

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

  return (
    <View>
      <MapView
        initialRegion={region}
        region={region}
        style={styles.map}
        showsUserLocation={true}
        zoomEnabled={true}
      >
        {currentUser.id
          ? filterOutOthersPrivateAudio.map((audioDoc) => (
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
                  audioDoc.data.userId === currentUser.id
                    ? audioDoc.data.isPrivate
                      ? '#306B34'
                      : '#FCAF58'
                    : '#FF5A5F'
                }
              />
            ))
          : filterOutAllPrivateAudio.map((audioDoc) => (
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
                pinColor='#FF5A5F'
              />
            ))}
      </MapView>
    </View>
  )
}
