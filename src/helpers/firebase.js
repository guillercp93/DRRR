/**
 * The file where all the configuration goes that you have seen
 * previously on your Firebase dashboard. In addition, Firebase
 * itself will be instantiated in this file.
 */
import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const auth = firebase.auth();

export {
    auth,
}
