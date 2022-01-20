import 'react-native-gesture-handler'
import React, { useEffect, useState } from 'react'
import { firebase } from './firebase.js'
// import { Location, Persmissions } from 'expo';
import { NavigationContainer } from '@react-navigation/native'
// import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import {
  LoginScreen,
  RegistrationScreen,
  PublicMapScreen,
  PersonalMapScreen,
  LandingScreen,
  NewRecording,
} from './src/screens'
import DrawerItems from './DrawerItems'
import { decode, encode } from 'base-64'

if (!global.btoa) {
  global.btoa = encode
}
if (!global.atob) {
  global.atob = decode
}

// const Stack = createStackNavigator()
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
          .catch((error) => {
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
    <NavigationContainer>
      <Drawer.Navigator
        drawerPosition="right"
        drawerType="front"
        screenOptions={{
          activeTintColor: '#e91e63',
          itemStyle: { marginVertical: 10 },
        }}
      >
        <Drawer.Screen name="Landing Page" component={LandingScreen} />
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
  )
}

/* <Stack.Navigator>
        {user ? (
          <Stack.Screen name="Home">
            {(props) => <HomeScreen {...props} extraData={user} />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
            <Stack.Screen name="Public Audio Map" component={PublicMapScreen} />
          </>
        )}
      </Stack.Navigator> */

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
