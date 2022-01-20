import * as React from 'react'
import styles from "./styles"
import { Image, Text, View, TouchableOpacity } from "react-native"
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'


const handleSignOut = () => {
  firebase
    .auth()
    .signOut()
    .then(() => console.log('User Sign Out Success!'))
    .catch(error => console.log('user cannot sign out: ', error))
}

export function CustomDrawerContent(props) {
    return (
      <>
        <DrawerContentScrollView {...props}>
        <DrawerItemList {...props}/>
          <DrawerItem 
          style={styles.signOutItem}
          label='Sign Out'
          onPress={() => handleSignOut()}
          />
        </DrawerContentScrollView>
      </>
    )
  }