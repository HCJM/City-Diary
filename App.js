import 'react-native-gesture-handler'
import React, { useEffect, useState } from 'react'
import { firebase } from './firebase.js'
import { AuthProvider } from './src/context/AuthContext.js'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import {
  LoginScreen,
  RegistrationScreen,
  PublicMapScreen,
  PersonalMapScreen,
  LandingScreen,
  NewRecording,
} from './src/screens'
import { decode, encode } from 'base-64'
import { CustomDrawerContent } from './src/screens/CustomDrawerContent/CustomDrawerContent.js'

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
    const storedUser = AsyncStorage.getItem('asyncUser')
      .then((response) => {
        console.log('stored user yoooo -->>>', response)
        console.info('=================')
      })
      .catch((err) => console.error(err))

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
          .catch((error) => {
            setLoading(false)
            mounted = false
          })
      } else if (storedUser !== undefined) {
        usersRef
          .doc(storedUser.uid)
          .get()
          .then((doc) => {
            const currUserData = doc.data()
            setLoading(false)
            setUser(currUserData)
            setIsLoggedIn(true)
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
        {isLoggedIn ? (
          <>
            <Drawer.Navigator
              drawerContent={(props) => <CustomDrawerContent {...props} />}
              drawerPosition="right"
              drawerType="front"
              screenOptions={{
                activeTintColor: '#e91e63',
                itemStyle: { marginVertical: 10 },
              }}
            >
              <Drawer.Screen
                name="Public Audio Map"
                component={PublicMapScreen}
              />
              <Drawer.Screen
                name="Personal Audio Map"
                component={PersonalMapScreen}
              />
              <Drawer.Screen name="New Recording" component={NewRecording} />
            </Drawer.Navigator>
          </>
        ) : (
          <>
            <Drawer.Navigator
              drawerContent={(props) => <CustomDrawerContent {...props} />}
              drawerPosition="right"
              drawerType="front"
              screenOptions={{
                activeTintColor: '#e91e63',
                itemStyle: { marginVertical: 10 },
              }}
            >
              <Drawer.Screen name="Landing Page" component={LandingScreen} />
              <Drawer.Screen name="Login" component={LoginScreen} />
              <Drawer.Screen
                name="Registration"
                component={RegistrationScreen}
              />
              <Drawer.Screen
                name="Public Audio Map"
                component={PublicMapScreen}
              />
            </Drawer.Navigator>
          </>
        )}
      </NavigationContainer>
    </AuthProvider>
  )
}
