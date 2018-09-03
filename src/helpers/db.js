import {db} from './firebase';

/**
 * Create a new user in firebase
 * @param {String} id 
 * @param {JSON} dataUser 
 */
export const doCreateUser = (id, dataUser) => {
    return db.ref(`users/${id}`).set(dataUser);
}

/**
 * Get a snapshot of registed users.
 */
export const onceGetUsers = () => {
    return db.ref('/users').once('value');
}

/**
 * Register active members of chat
 * @param {String} id 
 * @param {Boolean} value 
 */
export const createMembersActives = (id, value) => {
    let date = new Date();
    date = date.toISOString().split("T")[0];
    return db.ref(`members/${date}`).set({
        [id]: value,
    });
}

/**
 * Create a new message in chat
 * @param {JSON} dataMessage 
 */
export const doCreateMessage = (dataMessage) => {
    let date = new Date();
    date = date.toISOString().split("T")[0];
    return db.ref(`messages/${date}`).push(dataMessage);
}

/**
 * get messages of chat and always listen for new messages.
 * @param {function} callback 
 */
export const onGetMessages = (callback) => {
    let date = new Date();
    date = date.toISOString().split("T")[0];
    return db.ref(`messages/${date}`).on('value', callback);
}