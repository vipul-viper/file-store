import firebase from "firebase"

var firebaseConfig = {
    apiKey: "AIzaSyDrLF6c5BZpNvL41wNY1cbh9HECDPzofKY",
    authDomain: "picsharee-fb980.firebaseapp.com",
    databaseURL: "https://picsharee-fb980.firebaseio.com",
    projectId: "picsharee-fb980",
    storageBucket: "picsharee-fb980.appspot.com",
    messagingSenderId: "1042741753405",
    appId: "1:1042741753405:web:204adbff39708ac57d9c54"
  };
  
  const fire=firebase.initializeApp(firebaseConfig)
  
  const storage = firebase.storage()
  export  {
    fire,storage, firebase as default
  }