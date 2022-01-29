import { StatusBar } from 'expo-status-bar'
import * as React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import styles from './styles'

export default function LandingScreen({ navigation }) {
  const onExploreButtonPress = () => {
    navigation.navigate('City Diary Map')
  }

  const onLoginButtonPress = () => {
    navigation.navigate('Login')
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={require('../../../assets/cityDiary.png')}
        />
        <Text style={styles.text}>every city has a story.</Text>
        <Text style={styles.text}>be a part of it.</Text>
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
    </ScrollView>
  )
}
