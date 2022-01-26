import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { decode, encode } from 'base-64'
import React, { useEffect, useState } from 'react'
import 'react-native-gesture-handler'
import { firebase } from './firebase.js'
import { AuthProvider } from './src/context/AuthContext.js'
import MainNavigator from './context/MainNavigator.js'

if (!global.btoa) {
  global.btoa = encode
}
if (!global.atob) {
  global.atob = decode
}

const Drawer = createDrawerNavigator()

export default function App() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [region, setRegion] = useState(null)

  //PERSISTENT LOG-IN CODE...not functioning
  // if (loading) {
  //   return <></>
  // }
  useEffect(() => {
    let mounted = true
    const usersRef = firebase.firestore().collection('users')

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            if (mounted) {
              const userData = document.data()
              setLoading(false)
              setUser(userData)
              setIsLoggedIn(true)
            }
          })
          .catch(() => {
            setLoading(false)
            mounted = false
          })
      } else {
        setLoading(false)
        setIsLoggedIn(false)
        mounted = false
      }
    })
  }, [])

  return (
    <AuthProvider value={user}>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </AuthProvider>
  )
}
