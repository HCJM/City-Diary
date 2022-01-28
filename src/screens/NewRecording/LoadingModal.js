import * as React from 'react'
import { View, Modal, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from './styles'

export default function LoadingModal() {
  return (
    <SafeAreaView>
      <View>
        <Modal animationType="slide" transparent={true} visible={true}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Thanks for your entry!</Text>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  )
}
