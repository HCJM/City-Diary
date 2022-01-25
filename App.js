import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { decode, encode } from 'base-64'
import React, { useEffect, useState } from 'react'
import 'react-native-gesture-handler'
import { firebase } from './firebase.js'
import { AuthProvider } from './src/context/AuthContext.js'
import {
  LandingScreen,
  LoginScreen,
  NewRecording,
  PersonalMapScreen,
  PublicMapScreen,
  RegistrationScreen,
} from './src/screens'
import { CustomDrawerContent } from './src/screens/SignOutScreen/SignOutScreen.js'

import AsyncStorage from '@react-native-async-storage/async-storage'

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
  const { currentUser } = firebase.auth()

  //PERSISTENT LOG-IN CODE...not functioning
  // if (loading) {
  //   return <></>
  // }
  useEffect(async () => {
    let mounted = true
    let persistedUser
    const usersRef = firebase.firestore().collection('users')
    try {
      let persistedUser = await AsyncStorage.getItem('persistedUser')
      // persistedUser = JSON.parse(storedUser)
      console.log('persisted in app-->>', persistedUser)
      if (persistedUser.id) {
        const userDoc = await usersRef.doc(persistedUser.id).get()
        if (mounted) {
          const userData = userDoc.data
          setLoading(false)
          setUser(userData)
          setIsLoggedIn(true)
          console.log('USER ON STATE-->>', currentUser)
        } else {
          setLoading(true)
          mounted = false
        }
      } else {
        setLoading(true)
        setIsLoggedIn(false)
        mounted = false
      }
    } catch (error) {
      console.error(error)
    }
  }, [])

  return (
    <AuthProvider value={user}>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawerContent {...props} />}
          drawerPosition="right"
          drawerType="front"
          screenOptions={{
            activeTintColor: '#e91e63',
            itemStyle: { marginVertical: 10 },
          }}
        >
          <Drawer.Screen name="Explore" component={LandingScreen} />
          <Drawer.Screen name="Login" component={LoginScreen} />
          <Drawer.Screen name="Registration" component={RegistrationScreen} />
          <Drawer.Screen name="Public Audio Map" component={PublicMapScreen} />
          <Drawer.Screen
            name="Personal Audio Map"
            component={PersonalMapScreen}
          />
          <Drawer.Screen name="New Recording" component={NewRecording} />
        </Drawer.Navigator>
      </NavigationContainer>
    </AuthProvider>
  )
}

/*
const persistedUser = AsyncStorage.getItem('persistedUser')
      .then((response) => {
        JSON.parse(response)
        console.log('user from async storage in APP--->>>', JSON.parse(response))
      })
      .catch((error) => {
        console.error(error)
      })
    if (persistedUser) {
      usersRef
        .doc(persistedUser.id)
        .get()
        .then((document) => {
          if (mounted) {
            const userData = document.data()
*/

// firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     usersRef
//       .doc(user.uid)
//       .get()
//       .then((document) => {
//         if (mounted) {
//           const userData = document.data()
//           setLoading(false)
//           setUser(userData)
//           setIsLoggedIn(true)
//         }
//       })
//       .catch((error) => {
//         setLoading(false)
//         mounted = false
//       })
//   } else
// if (persistedUser !== null) {
//   usersRef
//     .doc(persistedUser.id)
//     .get()
//     .then((document) => {
//       if (mounted) {
//         const userData = document.data()
//         setLoading(false)
//         setUser(userData)
//         setIsLoggedIn(true)
//       }
//     })
//     .catch((error) => {
//       setLoading(false)
//       mounted = false
//     })
// } else {
//   setLoading(false)
//   setIsLoggedIn(false)
//   mounted = false
// }
//   })
// }, [])

//firebase.auth().onAuthStateChanged((user) => {
//   if (user) {
//     usersRef
//       .doc(user.uid)
//       .get()
//       .then((document) => {
//         if (mounted) {
//           const userData = document.data()
//           setLoading(false)
//           setUser(userData)
//           setIsLoggedIn(true)
//         }
//       })
//       .catch(() => {
//         setLoading(false)
//         setUser(userData)
//         setIsLoggedIn(true)
//       })
//       .catch((error) => {
//         setLoading(false)
//         mounted = false
//       })
//   } else {
//     setLoading(false)
//     setIsLoggedIn(false)
//     mounted = false
//   }
// })
