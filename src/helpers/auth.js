/**
 * The file where the Firebase authentication API will be defined to sign
 * up, sign in, sign out etc. a user in your application. It is the
 * interface between the official Firebase API and your React application.
 */
import { auth } from './firebase';

/**
 * Create a new user
 * @param {String} email 
 * @param {String} password 
 */
export const doCreateUserWithEmailAndPassword = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
};

/**
 * Log in user in the app
 * @param {String} email 
 * @param {String} password 
 */
export const doSignInWithEmailAndPassword = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
};

/**
 * Sign out user from app
 */
export const doSignOut = () => {
    return auth.signOut();
};
