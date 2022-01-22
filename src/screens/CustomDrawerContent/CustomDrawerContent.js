import * as React from 'react'
import styles from "./styles"
import { Image, Text, View, TouchableOpacity } from "react-native"
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
import { firebase } from '../../../firebase.js'
import { useNavigation } from '@react-navigation/native'
 
 
 
 
 
export function CustomDrawerContent(props) {
  const auth = firebase.auth()
  const signedInUser = auth.currentUser?.email
  
  const navigation = useNavigation()

  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => navigation.navigate('Landing Page'))
      .catch(error => console.log('user cannot sign out: ', error))
  }
 
    return (
       <DrawerContentScrollView {...props}>
       <DrawerItemList {...props}/>
         <DrawerItem
         style={styles.signOutItem}
         label='Log Out'
         onPress={() => handleSignOut()}
         />
       </DrawerContentScrollView>
   )
 }

