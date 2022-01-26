import { createDrawerNavigator } from '@react-navigation/drawer'
import { useContext } from 'react'
import { useAuth } from '../src/context/AuthContext'
import { LoginScreen,
    LandingScreen, 
    NewRecording,
    PersonalMapScreen,
    PublicMapScreen,
    RegistrationScreen, } from '../src/screens'
import ProfileScreen from '../src/screens/ProfileScreen/ProfileScreen'
import { CustomDrawerContent } from '../src/screens/SignOutScreen/SignOutScreen'

const Drawer = createDrawerNavigator()

const MainNavigator = () => {
    const { LoggedIn } = useAuth()
    console.log(LoggedIn)
    return (
        LoggedIn ? (
            <Drawer.Navigator
        //   drawerContent={(props) => <CustomDrawerContent {...props} />}
          drawerPosition="right"
          drawerType="front"
          screenOptions={{
            activeTintColor: '#e91e63',
            itemStyle: { marginVertical: 10 },
          }}
        >
          <Drawer.Screen name="Explore" component={LandingScreen} />
          
          <Drawer.Screen name="Public Audio Map" component={PublicMapScreen} />
          <Drawer.Screen
            name="Personal Audio Map"
            component={PersonalMapScreen}
          />
          <Drawer.Screen name="New Recording" component={NewRecording} />
          <Drawer.Screen name="My Profile" component={ProfileScreen}/>
        </Drawer.Navigator>
        ) : (
            <Drawer.Navigator>
                <Drawer.Screen name="Login" component={LoginScreen} />
                <Drawer.Screen name="Registration" component={RegistrationScreen} />
            </Drawer.Navigator>
        )
        
    )
}

export default MainNavigator