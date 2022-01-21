import * as React from 'react'
import styles from "./styles"
import { Image, Text, View, TouchableOpacity } from "react-native"
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'
// import firebase from 'firebase/compat/app'
// import 'firebase/compat/auth'
import { firebase } from '../../../firebase.js'
import { useNavigation } from '@react-navigation/native'
 
 
 
 
 
export function CustomDrawerContent(props) {
  const auth = firebase.auth()
  const signedInUser = auth.currentUser?.email
  console.log('this user is signed in: ', signedInUser)
  
  const navigation = useNavigation()

  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {console.log('User Sign Out Success! ', signedInUser), navigation.navigate('Landing Page')})
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
       </DrawerContentScrollView>
     </>
   )
 }

