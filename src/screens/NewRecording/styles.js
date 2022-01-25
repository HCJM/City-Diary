import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A9A9A9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    height: 50,
    width: 200,
    justifyContent: 'center',
    paddingVertical: 20,
    marginVertical: 20,
  },
  pickerView: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  text: {
    color: 'black',
    fontSize: 17,
    textAlign: 'center',
    paddingTop: 30,
  },
  input: {
    height: 40,
    margin: 20,
    borderWidth: 1,
    padding: 10,
    width: 200,
  },
  image: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginTop: 15,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
    padding: 13,
    paddingHorizontal: 20,
    marginTop: 42,
    marginHorizontal: 65,
    width: 250,
  },
  // Modal start
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'stretch',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  hidden: {
    display: 'none',
  },
  modalButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
    marginVertical: 15,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
  },
  // Modal end
})
