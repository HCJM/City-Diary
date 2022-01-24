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

    // o: you can use async await here
    // o: also, it may make sense to export the usersRef and use it where you
    //  need it
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        /* 
         const document = usersRef
          .doc(user.uid)
          .get()

          const userData = document.data()
          setLoading(false)
          setUser(userData)
          setIsLoggedIn(true)
        */
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
