import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import styles from './styles'
import { useEffect } from 'react/cjs/react.development'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function LandingScreen({ navigation }) {
  useEffect(() => {
    const persistedUser = AsyncStorage.getItem('persistedUser')
      .then((response) => {
        console.log('persisted user landing page...', JSON.parse(response))
      })
      .catch((error) => {
        console.error(error)
      })
    console.log('LANDING PAGE user--->>>', persistedUser)
  })
  const onExploreButtonPress = () => {
    navigation.navigate('Public Audio Map')
  }

  const onLoginButtonPress = () => {
    navigation.navigate('Login')
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../../assets/logo.jpeg')}
      />
      <StatusBar style="auto" />
      <TouchableOpacity
        style={styles.exploreButton}
        onPress={() => onExploreButtonPress()}
      >
        <Text style={styles.exploreButtonTitle}>Explore</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signUpLoginButton}
        onPress={() => onLoginButtonPress()}
      >
        <Text style={styles.signUpLoginButtonTitle}>Login</Text>
      </TouchableOpacity>
    </View>
  )
}
