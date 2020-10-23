import * as firebase from 'firebase';
import firebase_config from "./config/firebase_config";

export const firebaseApp = firebase.initializeApp(firebase_config);
export const hrRef = firebase.database().ref('data');
export const storageRef = firebase.storage().ref('DP');
export const userRef = firebase.database().ref('users');
