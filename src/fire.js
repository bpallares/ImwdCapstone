import firebase from 'firebase'
var config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
  apiKey: 'AIzaSyBFc01ebfZAilmqaZoGO4WpIJ2Ln71Tp4Y',
  authDomain: 'my-course-organizer.firebaseapp.com',
  databaseURL: 'https://my-course-organizer.firebaseio.com',
  storageBucket: 'my-course-organizer.appspot.com',
  messagingSenderId: '518372893337'
}

export const firebaseApp = firebase.initializeApp(config)

export const db = firebaseApp.database() // the real-time database
export const auth = firebaseApp.auth() // the firebase auth namespace

export const storageKey = 'KEY_FOR_LOCAL_STORAGE'

export const isAuthenticated = () => {
  return !!auth.currentUser || !!localStorage.getItem(storageKey)
}
