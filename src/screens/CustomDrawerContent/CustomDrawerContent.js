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
import { useAuth } from '../../context/AuthContext'

export function CustomDrawerContent(props) {
  const { setCurrentUser } = useAuth()
  const { currentUser } = useAuth()

  const navigation = useNavigation()

  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        setCurrentUser(null)
        console.log('LOOK -->>', currentUser)
        navigation.navigate('Landing Page')
      })
      .catch((error) => console.log('user cannot sign out: ', error))
  }

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        style={styles.signOutItem}
        label="Log Out"
        onPress={() => handleSignOut()}
      />
    </DrawerContentScrollView>
  )
}
