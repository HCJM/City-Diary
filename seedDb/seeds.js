const { firebase } = require ('../firebase.js')
const { users } = require ('./users.js')


const seeding = function () {
  
  let index = 0
  const interval = setInterval(async () => {
    const user = users[index]
    
    const { email, firstName, lastName, userName, password } = user
    console.log('Current user: ', user.firstName)

    await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async (response) => {
        console.log('Created user in Authentication');
        const uid = response.user.uid;
        const data = {
          id: uid,
          email,
          firstName,
          lastName,
          userName,
        };
        const usersRef = firebase.firestore().collection('users').doc(uid);
        await usersRef.set(data);
        console.log('Adding user to the users collection: ', data.email);
      })
      .catch((error) => console.log(error));
      await firebase
      .auth()
      .signOut()
      .then(() => console.log('Sign out successful!'))
      .catch((error) => console.log(error));
    index += 1;
    if (index === users.length) clearInterval(interval)
  }, 2500)
    
 
};

module.exports = {
  seeding
}