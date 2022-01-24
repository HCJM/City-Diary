import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer'
import { useNavigation } from '@react-navigation/native'
import * as React from 'react'
import { useState } from 'react/cjs/react.development'
import { firebase } from '../../../firebase.js'
import { useAuth } from '../../context/AuthContext'
import styles from './styles.js'

export function CustomDrawerContent(props) {
  // o: this is not being used
  const [label, setLabel] = useState('')
  const { setCurrentUser } = useAuth()
  const { currentUser } = useAuth()

  const navigation = useNavigation()

  const navigateToLandingPage = () => {
    navigation.navigate('Explore')
  }

  // o: you are using async await and the origina syntax 🤔
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
