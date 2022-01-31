import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

//Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAU2sGpsZNxYVfF6Tbz7pxmycJvrm5r5j0",
  authDomain: "citydiary-ec8b6.firebaseapp.com",
  databaseURL: "https://citydiary-ec8b6.firebaseio.com",
  projectId: "citydiary-ec8b6",
  storageBucket: "citydiary-ec8b6.appspot.com",
  messagingSenderId: "285042164496",
  appId: "1:285042164496:ios:ac7af2a55fd0d39a3bdb95",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };

// export const db = getFirestore(app)
