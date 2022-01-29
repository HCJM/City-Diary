import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 350,
    height: 350,
    // marginTop: 0,
    // paddingTop: 0
  },
  text: {
    marginTop: 20,
    fontSize: 20,
  },
  exploreButton: {
    backgroundColor: '#85c7f2',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 50,
    height: 48,
    width: 330,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  exploreButtonTitle: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
  signUpLoginButton: {
    backgroundColor: '#4e598c',
    marginLeft: 30,
    marginRight: 30,
    marginTop: 40,
    height: 48,
    width: 330,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    elevation: 5,
  },
  signUpLoginButtonTitle: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
})
