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
        region={region}
        style={styles.map}
        showsUserLocation={true}
        zoomEnabled={true}
      >
        {audioDetails.map((audioDoc) => (
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
              audioDoc.data.userId === currentUser.id ? '#000000' : '#FF0000'
            }
          />
        ))}
      </MapView>
    </View>
  )
}
 {/* {location ? (
        currentUser.id ? (
          <MapView
            initialRegion={userRegion}
            style={styles.map}
            showsUserLocation={true}
            zoomEnabled={true}
          >
            {filterOutOthersPrivateAudio.map((audioDoc) => (
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
                      ? '#000000'
                      : '#008000'
                    : '#FF0000'
                }
              />
            ))}
          </MapView>
        ) : (
          <MapView
            initialRegion={userRegion}
            style={styles.map}
            showsUserLocation={true}
            zoomEnabled={true}
          >
            {filterOutAllPrivateAudio.map((audioDoc) => (
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
                    ? '#008000'
                    : '#FF0000'
                }
              />
            ))}
          </MapView>
        )
      ) : (
        <MapView
          region={{
            latitude: 40.73061,
            longitude: -73.97,
            ...deltas,
          }}
          zoomEnabled={true}
          style={styles.map}
        >
          {filterOutAllPrivateAudio.map((audioDoc) => (
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
            />
          ))}
        </MapView>
      )} */}