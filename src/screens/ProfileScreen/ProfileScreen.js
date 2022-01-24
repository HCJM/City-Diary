import { View, SafeAreaView } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Caption, Text, Title, TouchableRipple } from 'react-native-paper'
import styles from './styles.js'



export default function ProfileScreen ({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.userInfoSection}>
                    <View style={{flexDirection: 'row', marginTop: 15}}>
                    <View style={{marginLeft: 20}}>
                        <Title style={[styles.title, {
                        marginTop:15,
                        marginBottom: 5,
                        }]}>Hello Jose!</Title>
                        <Caption style={styles.caption}>@mauilema</Caption>
                    </View>
                    </View>
                </View>

                <View style={styles.userInfoSection}>
                    <View style={styles.row}>
                    <Text style={{color:"#777777", marginLeft: 20}}>Brooklyn, NY</Text>
                    </View>
                </View>

                <View style={styles.menuWrapper}>
                    <TouchableRipple onPress={() => {}}>
                    <View style={styles.menuItem}>
                        <Text style={styles.menuItemText}>My Latest Entry 1-24-22</Text>
                    </View>
                    </TouchableRipple>
                    <TouchableRipple onPress={() => {}}>
                    <View style={styles.menuItem}>
                        <Text style={styles.menuItemText}>My Latest Entry 1-23-22</Text>
                    </View>
                    </TouchableRipple>
                    <TouchableRipple onPress={() => {}}>
                    <View style={styles.menuItem}>
                        <Text style={styles.menuItemText}>My Latest Entry 1-22-22</Text>
                    </View>
                    </TouchableRipple>
                    <TouchableRipple onPress={() => {}}>
                    <View style={styles.menuItem}>
                        <Text style={styles.menuItemText}>My Latest Entry 1-21-22</Text>
                    </View>
                    </TouchableRipple>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

