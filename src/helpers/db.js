import {db} from './firebase';

export const doCreateUser = (id, dataUser) => {
    return db.ref(`users/${id}`).set(dataUser);
}

export const onceGetUsers = () => {
    return db.ref('/users').once('value');
}