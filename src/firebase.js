import * as firebase from 'firebase';


const config = {
    apiKey: "AIzaSyDZKsUveG8D70aJUf-8096u9KhFbM98B9c",
    authDomain: "attendance-marking-syste-4b323.firebaseapp.com",
    databaseURL: "https://attendance-marking-syste-4b323.firebaseio.com",
    projectId: "attendance-marking-syste-4b323",
    storageBucket: "attendance-marking-syste-4b323.appspot.com",
    messagingSenderId: "624281714525",
    appId: "1:624281714525:web:d17a68812aaf6a0f11f2b4",
    measurementId: "G-Q54ER6WKTZ"
  };

export const firebaseApp = firebase.initializeApp(config);
export const hrRef = firebase.database().ref('data');
export const storageRef = firebase.storage().ref('DP');
export const userRef = firebase.database().ref('users');
