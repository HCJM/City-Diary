import { useNavigation } from '@react-navigation/native'
import * as React from 'react'
import { Modal, Text, TouchableOpacity, View } from 'react-native'
import styles from './modalStyles'

export default function SignInPrompt({ open, onClose }) {
  const navigation = useNavigation()
  return (
    <View style={styles.centeredView}>
      <Modal visible={open} animationType="slide" transparent={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View>
              <Text style={styles.modalText}>
                Please log in to contribute to City Diary
              </Text>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  onClose()
                  navigation.navigate('Login')
                }}
              >
                <Text style={styles.textStyle}>Click here to log in</Text>
              </TouchableOpacity>
            </View>

            <View>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose, { marginTop: 5 }]}
                onPress={() => {
                  onClose()
                }}
              >
                <Text style={styles.textStyle}>Keep exploring</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}
