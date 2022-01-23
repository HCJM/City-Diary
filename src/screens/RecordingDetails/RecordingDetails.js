import { StyleSheet, Text, View, SafeAreaView, TextInput } from 'react-native'

export default function RecordingDetails({ navigation }) {
  const [Title, onChangeTitle] = React.useState('')
  const [Description, onChangeDescription] = React.useState('')
  return (
    <SafeAreaView>
      <View>
        <TextInput
          placeholder="Recording Title"
          placeholderTextColor="grey"
          onChangeText={(text) => onChangeTitle(text)}
          value={Title}
          underlineColorAndroid="transparent"
        />

        <TextInput
          placeholder="Description (Limited to 280 characters)"
          placeholderTextColor="grey"
          onChangeText={(text) => onChangeDescription(text)}
          value={Description}
          underlineColorAndroid="transparent"
        />

        <TouchableOpacity style={styles.button}>
          <Text>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'black',
    fontSize: 25,
    fontFamily: 'Georgia-Italic',
    textAlign: 'center',
    paddingTop: 500,
    paddingRight: 5,
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
    marginTop: 65,
    width: 300,
  },
})
