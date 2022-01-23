import react from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import NewRecording from '../src/screens/NewRecording/NewRecording'
import RegistrationScreen from '../src/screens/RegistrationScreen/RegistrationScreen'
import { LandingScreen } from '../src/screens'

const Stack = createStackNavigator()

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: '#9AC4F8',
  },
  headerTintColor: 'white',
  headerBackTitle: 'Back',
}

const MainStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Record" component={NewRecording} />
      <Stack.Screen name="Register" component={RegistrationScreen} />
    </Stack.Navigator>
  )
}

const RecordNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="New Recording" component={NewRecording} />
    </Stack.Navigator>
  )
}

export { MainStackNavigator, RecordNavigator }
