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
    
    useEffect(() => {

        const fetchAllUserAudio = async () => {
            const allAudioRef = firebase.firestore().collection('audio')
            allAudioRef.orderBy('uploadedAt', 'desc').where('userId', '==', `${currentUser.id}`).onSnapshot((querySnapShot) => {
                const audioList = []
                querySnapShot.forEach((doc) => {
                    audioList.push(doc.data())
                    // console.log(audioList)
                })
                setUserAudioFiles(audioList)
            })

            
            // usersDocs.forEach((userAudioDoc) => {
            //     const dataObj = { data: userAudioDoc.data() }
            //     console.log(dataObj)
            // })
        }
        fetchAllUserAudio()
        
        
        
    }, [])
        

   


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
            
                <View style={styles.userInfoSection}>
                    <View style={styles.nameUserNameView}>
                    <View style={styles.nameUserName}>
                        <Title style={styles.title}>Howdy, {currentUser.firstName}!</Title>
                        <Caption style={styles.caption}>@{currentUser.userName}</Caption>
                    </View>
                    </View>
                </View>

                <View style={styles.userInfoSection}>
                    <View style={styles.row}>
                    <Text style={styles.locationText}>My Audio Entries:</Text>
                    </View>
                </View> 

                {userAudioFiles.map(audioFile => 
                    <View key={audioFile.uploadedAt} style={styles.menuWrapper}>
                        <TouchableRipple onPress={() => console.log(JSON.stringify(audioFile.title))}>
                            <View style={styles.menuItem}>
                                <Text style={styles.menuItemText}>Audio Title: {audioFile.title}</Text>
                            </View>
                        </TouchableRipple>
                    </View> 
                )}

            </ScrollView>
        </SafeAreaView>
    )
}

