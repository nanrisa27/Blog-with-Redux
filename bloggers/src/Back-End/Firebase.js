import * as firebase from "firebase";


// bloggers web app's Firebase configuration

const Config = {
  apiKey: "AIzaSyBVlR08bBOq3zNfmm41KtxKsysFzTVIlbg",
  authDomain: "react-bloger.firebaseapp.com",
  databaseURL: "https://react-bloger.firebaseio.com",
  projectId: "react-bloger",
  storageBucket: "react-bloger.appspot.com",
  messagingSenderId: "419639213036",
  appId: "1:419639213036:web:4263fb8a9adb1315969ec9",
  measurementId: "G-MEP00TLGYP"
};

//initializing firebase

firebase.initializeApp(Config);
firebase.analytics();

//a constant that simply refers to the firebase database in reference to /Post

export const database = firebase.database().ref('/post');