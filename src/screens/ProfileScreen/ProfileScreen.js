import { useEffect, useState } from 'react'
import { firebase } from '../../../firebase.js'
import { useAuth } from '../../context/AuthContext'
import { View, SafeAreaView, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Button, Caption, Text, Title, TouchableRipple } from 'react-native-paper'
import styles from './styles.js'



export default function ProfileScreen ({ navigation }) {
    const [userAudioFiles, setUserAudioFiles] = useState([]) 

    // currentUser is an object with these properties: email, firstName, id, lastName, userName
    const currentUser = useAuth().currentUser || {}

    console.log('currentUser before mount ===>', currentUser)
    
    useState(() => {
        // const consFunction = () => {
        //     console.log(currentUser.id)
        // }
        

        const fetchAllUserAudio = async () => {
            const allAudioRef = firebase.firestore().collection('audio')
            allAudioRef.where('userId', '==', 'n1oN7vmAXeYf2PbFOJDf5nr9sNJ3' ).onSnapshot((querySnapShot) => {
                const audioList = []
                querySnapShot.forEach((doc) => {
                    audioList.push(doc.data())
                    console.log(audioList)
                })
            })

            
            // usersDocs.forEach((userAudioDoc) => {
            //     const dataObj = { data: userAudioDoc.data() }
            //     console.log(dataObj)
            // })
        }
        fetchAllUserAudio()
        
        
        // consFunction()
    }, [])
        

   


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
               

                <View style={styles.userInfoSection}>
                    <View style={styles.nameUserNameView}>
                    <View style={styles.nameUserName}>
                        <Title style={styles.title}>Hello Jose!</Title>
                        <Caption style={styles.caption}>@mauilema</Caption>
                    </View>
                    </View>
                </View>

                {/* <TouchableOpacity onPress={() => currentUser ? console.log(currentUser) : null}> 
                        <Button>currentUser</Button>
                </TouchableOpacity> */}

                <View style={styles.userInfoSection}>
                    <View style={styles.row}>
                    <Text style={styles.locationText}>My Audio Entries:</Text>
                    </View>
                </View>

                <View style={styles.menuWrapper}>
                    <TouchableRipple onPress={() => console.log('hello friend')}>
                    <View style={styles.menuItem}>
                        <Text style={styles.menuItemText}>My Latest Entry 1-24-22</Text>
                    </View>
                    </TouchableRipple>
                    <TouchableRipple onPress={() => console.log('hello friend')}>
                    <View style={styles.menuItem}>
                        <Text style={styles.menuItemText}>My Latest Entry 1-23-22</Text>
                    </View>
                    </TouchableRipple>
                    <TouchableRipple onPress={() => console.log('hello friend')}>
                    <View style={styles.menuItem}>
                        <Text style={styles.menuItemText}>My Latest Entry 1-22-22</Text>
                    </View>
                    </TouchableRipple>
                    <TouchableRipple onPress={() => console.log('hello friend')}>
                    <View style={styles.menuItem}>
                        <Text style={styles.menuItemText}>My Latest Entry 1-21-22</Text>
                    </View>
                    </TouchableRipple>

                    
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

