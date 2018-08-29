import firebase from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBaPc_uA6ib1WCjmUp9ggXnig_O5VZDdxQ",
    authDomain: "dollars-reactive.firebaseapp.com",
    databaseURL: "https://dollars-reactive.firebaseio.com",
    projectId: "dollars-reactive",
    storageBucket: "dollars-reactive.appspot.com",
    messagingSenderId: "676805594394"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const auth = firebase.auth();

export {
    auth,
}