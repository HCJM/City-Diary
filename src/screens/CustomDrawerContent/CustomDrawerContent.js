import * as React from 'react'
import { Image, Text, View, TouchableOpacity } from "react-native"
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer'

export function CustomDrawerContent(props) {
    return (
      
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props}/>
        <DrawerItem 
        label='Sign Out'
        onPress={() => console.log('sign out functionality')}
        />
      </DrawerContentScrollView>
    )
  }