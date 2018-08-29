import * as firebase from 'firebase';


const config = {
    apiKey: "AIzaSyCEgo6N5zRJjG7wbgiqgquAyJd9YJ0PI80",
    authDomain: "sumhr-33fb7.firebaseapp.com",
    databaseURL: "https://sumhr-33fb7.firebaseio.com",
    projectId: "sumhr-33fb7",
    storageBucket: "sumhr-33fb7.appspot.com",
    messagingSenderId: "513513571493"
  };

export const firebaseApp = firebase.initializeApp(config);
export const hrRef = firebase.database().ref('data');
export const storageRef = firebase.storage().ref('DP');
export const userRef = firebase.database().ref('users');
