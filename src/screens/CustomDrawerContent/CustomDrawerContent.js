import * as React from 'react'
import styles from './styles'
import { Image, Text, View, TouchableOpacity } from 'react-native'
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer'
import { firebase } from '../../../firebase.js'
import { useNavigation } from '@react-navigation/native'
import { useEffect, useState } from 'react/cjs/react.development'
import { useAuth } from '../../context/AuthContext'

export function CustomDrawerContent(props) {
  const [label, setLabel] = useState('')
  const { setCurrentUser } = useAuth()
  const { currentUser } = useAuth()

  const navigation = useNavigation()

  const navigateToLandingPage = () => {
    navigation.navigate('Explore')
  }

  const handleSignOut = async () => {
    await firebase
      .auth()
      .signOut()
      .then(() => {
        setCurrentUser(null)
        navigateToLandingPage()
      })
      .catch((error) => console.log('user cannot sign out: ', error))
  }

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        style={styles.signOutItem}
        label={currentUser ? 'Log Out' : ''}
        onPress={() => {
          currentUser ? handleSignOut() : null
        }}
      />
    </DrawerContentScrollView>
  )
}
