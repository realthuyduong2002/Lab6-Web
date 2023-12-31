import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/database';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyD5GfGykd59kR4RvsQ6zl--NaTFzKO83FM",
    authDomain: "facebook-mern-535e3.firebaseapp.com",
    projectId: "facebook-mern-535e3",
    storageBucket: "facebook-mern-535e3.appspot.com",
    messagingSenderId: "413745629500",
    appId: "1:413745629500:web:d68a168bc7ed2482543639"
};
const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export { db, auth, storage };