import { StyleSheet } from "react-native"
 
// export default StyleSheet.create({
//    container: {
//        flex: 1,
//        alignItems: "center"
//    }
// })



export default StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      width: 200,
      height: 200,
    },
    exploreButton: {
      backgroundColor: "#788eec",
      marginLeft: 30,
      marginRight: 30,
      marginTop: 70,
      height: 48,
      width:330,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
    },
    exploreButtonTitle: {
      color: "white",
      fontSize: 17,
      fontWeight: "bold",
    },
    signUpLoginButton: {
      backgroundColor: "#b047ed",
      marginLeft: 30,
      marginRight: 30,
      marginTop: 70,
      height: 48,
      width: 330,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
    },
    signUpLoginButtonTitle: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
    },
  });