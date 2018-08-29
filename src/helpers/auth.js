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
