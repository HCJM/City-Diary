import 'react-native-gesture-handler'
import React, { useEffect, useState } from 'react'
// import { Location, Persmissions } from 'expo';
import { NavigationContainer } from '@react-navigation/native'
// import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import {
  LoginScreen,
  HomeScreen,
  RegistrationScreen,
  PublicMapScreen,
  PersonalMapScreen,
  NewRecording,
  RecordingDetails,
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
  const [region, setRegion] = useState(null)

  // useEffect();

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerPosition="right"
        drawerType="front"
        // initialRouteName="Home"
        screenOptions={{
          activeTintColor: '#e91e63',
          itemStyle: { marginVertical: 10 },
        }}
      >
        {user ? (
          <Drawer.Screen name="Home">
            {(props) => <HomeScreen {...props} extraData={user} />}
          </Drawer.Screen>
        ) : (
          DrawerItems.map((drawer) => (
            <Drawer.Screen
              key={drawer.name}
              name={drawer.name}
              component={
                drawer.name === 'Login'
                  ? LoginScreen
                  : drawer.name === 'Registration'
                  ? RegistrationScreen
                  : drawer.name === 'Personal Audio Map'
                  ? PersonalMapScreen
                  : drawer.name === 'New Recording'
                  ? NewRecording
                  : PublicMapScreen
              }
            />
          ))
        )}
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
