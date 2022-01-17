import React, { useState } from "react";
import { StatusBar } from 'expo-status-bar';
import { Image, Text, View, TouchableOpacity } from "react-native"
import styles from "./styles"
 
export default function LandingScreen ( { navigation } ) {
 
    const onExploreButtonPress = () => {
        navigation.navigate('Public Audio Map')
    }
 
   return (
   
    <View style={styles.container}>
        <Image 
            style={styles.logo}
            source={require("/Users/Jennifer/City-Diary/assets/logo.jpeg")}
        />
        <StatusBar style="auto" />
        <TouchableOpacity style={styles.exploreButton} onPress={() => onExploreButtonPress()}>
            <Text style={styles.exploreButtonTitle}>Explore</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signUpLoginButton} onPress={() => console.log('Sign Up/Login button was pressed')}>
            <Text style={styles.signUpLoginButtonTitle}>Sign Up / Login</Text>
        </TouchableOpacity>

    </View>


    
   )
}


  