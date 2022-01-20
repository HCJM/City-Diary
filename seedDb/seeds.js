const { firebase } = require('../firebase.js')
const { users } = require('./users.js')

const seeding = function () {
  // console.log('hola ', users)

  let index = 0
  const interval = setInterval(async () => {
    const user = users[index]

    const { email, firstName, lastName, userName, password } = user
    console.log('Current user: ', user.firstName)

    await firebase
      .auth()
      // create a new user account associated with the specified email and password
      .createUserWithEmailAndPassword(email, password)
      .then(async (response) => {
        console.log('Created user in Authentication')
        // store the uid from the UserCredential returned from .createUserWithEmailAndPassword method
        const uid = response.user.uid
        // create the data object with the same uid as above
        const data = {
          id: uid,
          email,
          firstName,
          lastName,
          userName,
        }
        // create a user document reference in the users collection using uid as identifier
        const usersRef = firebase.firestore().collection('users').doc(uid)
        // set the user document data using the data object above
        await usersRef.set(data)
        console.log('Adding user to the users collection: ', data.email)
      })
      .catch((error) => console.log(error))
    await firebase
      .auth()
      // sign out the current user (newly created)
      .signOut()
      .then(() => console.log('Sign out successful!'))
      .catch((error) => console.log(error))
    // increment index to access the different user data
    index += 1
    // when we reach the end of the seedData array, remove the setInterval method
    if (index === users.length) clearInterval(interval)
  }, 2500)
}

module.exports = {
  seeding,
}
