import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyB9WZG2GpbagZK-8SUWEwwLO2H6JK7UDtI",
  authDomain: "fir-logiututorial.firebaseapp.com",
  databaseURL: "https://fir-logiututorial.firebaseio.com",
  projectId: "fir-logiututorial",
  storageBucket: "fir-logiututorial.appspot.com",
  messagingSenderId: "665839546206"
};


firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const database = firebase.database();
export default firebase;