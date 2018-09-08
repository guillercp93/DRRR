import { db, storage } from './firebase';

const storageRef = storage.ref();

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
    return db.ref(`members/${date}`).update({
        [id]: value,
    });
}

/**
 * Create a new message in chat.
 * @param {JSON} dataMessage 
 */
export const doCreateMessage = (dataMessage) => {
    let date = new Date();
    date = date.toISOString().split("T")[0];
    const newDataMessage = { ...dataMessage };
    let routeFile = '';
    if (dataMessage.file) {
        if (dataMessage.file.type.match(/image/)) {
            routeFile = `image/${date}/${dataMessage.file.name}`;
        } else if (dataMessage.file.type.match(/audio/)) {
            routeFile = `audio/${date}/${dataMessage.file.name}`;
        } else if (dataMessage.file.type.match(/text/)) {
            routeFile = `documents/${date}/${dataMessage.file.name}`;
        }
        return storageRef.child(routeFile).put(dataMessage.file).then(snapshot =>
            snapshot.ref.getDownloadURL()).then(url => {
                newDataMessage.file = {
                    route: url,
                    type: dataMessage.file.type,
                };
                return db.ref(`messages/${date}`).push(newDataMessage);
            });
    }else {
        return db.ref(`messages/${date}`).push(newDataMessage);
    }
}

/**
 * get messages of chat (current date) and always listen for new messages.
 * @param {function} callback 
 */
export const onGetMessages = (callback) => {
    let date = new Date();
    date = date.toISOString().split("T")[0];
    return db.ref(`messages/${date}`).on('value', callback);
}

/**
 * Obtain active members of chat (current date)
 * @param {Function} callback
 */
export const onGetMembersActives = (callback) => {
    let date = new Date();
    date = date.toISOString().split("T")[0];
    return db.ref(`members/${date}`).orderByValue()
             .equalTo(true).on('value', callback)
}