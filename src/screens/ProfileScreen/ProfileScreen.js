import { View, SafeAreaView } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Caption, Text, Title, TouchableRipple } from 'react-native-paper'
import styles from './styles.js'



export default function ProfileScreen ({ navigation }) {
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

