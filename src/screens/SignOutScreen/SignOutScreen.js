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

//import AsyncStorage from '@react-native-async-storage/async-storage'


export function CustomDrawerContent(props) {
  const [label, setLabel] = useState('')
  // const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { setCurrentUser } = useAuth()
  const { currentUser } = useAuth()

  const navigation = useNavigation()

  // useEffect(() => {
  //   const persistedUser = AsyncStorage.getItem('persistedUser')
  //     .then((response) => {
  //       JSON.parse(response)
  //       console.log('user from async storage--->>>', JSON.parse(response))
  //     })
  //     .catch((error) => {
  //       console.error(error)
  //     })
  //   if (persistedUser !== null) {
  //     setIsLoggedIn(true)
  //   }
  // }, [])
  const navigateToLandingPage = () => {
    navigation.navigate('Explore')
  }

  const handleSignOut = async () => {
    await firebase
      .auth()
      .signOut()
      .then(() => {
        setCurrentUser(null)
        AsyncStorage.removeItem('persistedUser')
        console.log('LOGGED OUT-->>>', currentUser)
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
