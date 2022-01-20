import * as React from 'react'
import styles from "./styles"
import { Image, Text, View, TouchableOpacity } from "react-native"
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { auth } from '../../../firebase'




export function CustomDrawerContent(props) {

  const signedInUser = auth.currentUser?.email
  console.log(signedInUser)

  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => console.log('User Sign Out Success! ', signedInUser))
      .catch(error => console.log('user cannot sign out: ', error))
  }

  
    return (
      <>
        <DrawerContentScrollView {...props}>
        <DrawerItemList {...props}/>
          <DrawerItem 
          style={styles.signOutItem}
          label='Sign Out'
          onPress={() => handleSignOut()}
          />
          {/* <Text>Email: {auth.currentUser?.email}</Text> */}
        </DrawerContentScrollView>
      </>
    )
  }