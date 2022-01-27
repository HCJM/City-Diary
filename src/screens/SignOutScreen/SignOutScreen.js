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
  const [label, setLabel] = useState('')
  const { setCurrentUser } = useAuth()
  const { currentUser } = useAuth()
  const { setLoggedIn } = useAuth()

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
        // label={currentUser ? 'Log Out' : ''}
        label={'Log Out'}
        onPress={() => {
          {
            setLoggedIn(false), handleSignOut()
          }
        }}
      />
    </DrawerContentScrollView>
  )
}
