import firebase from "firebase";

const config = {
    apiKey: "AIzaSyAgWbNehXMsVPOxxBtRW24MyQz2NKLGblI",
    authDomain: "anytime-lib.firebaseapp.com",
    databaseURL: "https://anytime-lib.firebaseio.com",
    projectId: "anytime-lib",
    storageBucket: "anytime-lib.appspot.com",
    messagingSenderId: "313435702070",
};

firebase.initializeApp(config);

const storageRef = firebase.storage().ref();

export {storageRef};
export default firebase;