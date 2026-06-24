import { ref, set, push, update, get, onValue, query, orderByValue, equalTo, Unsubscribe } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from './firebase';

const storageRoot = storageRef(storage);

// Types
export interface DataUser {
  username: string;
  avatar: string;
  color: string;
  email: string;
}

export interface DataMessage {
  author: string;
  text: string;
  timestamp: number;
  file?: File | null;
}

export interface MessageData {
  author: string;
  text: string;
  timestamp: number;
  file?: { route: string; type: string } | null;
}

// Get today's date key
const todayKey = (): string => {
  return new Date().toISOString().split('T')[0];
};

// Create a new user
export const doCreateUser = (id: string, dataUser: DataUser) => {
  return set(ref(db, `users/${id}`), dataUser);
};

// Get registered users
export const onceGetUsers = () => {
  return get(ref(db, '/users'));
};

// Listen for users in real-time
export const onGetUsers = (callback: (snapshot: { val: () => unknown }) => void): Unsubscribe => {
  return onValue(ref(db, '/users'), callback);
};

// Register active members
export const createMembersActives = (id: string, value: boolean) => {
  const date = todayKey();
  return update(ref(db, `members/${date}`), { [id]: value });
};

// Create a new message
export const doCreateMessage = (dataMessage: DataMessage) => {
  const date = todayKey();
  const newDataMessage: Record<string, unknown> = { ...dataMessage };
  let routeFile = '';

  if (dataMessage.file) {
    if (dataMessage.file.type.match(/image/)) {
      routeFile = `image/${date}/${(dataMessage.file as File).name}`;
    } else if (dataMessage.file.type.match(/audio/)) {
      routeFile = `audio/${date}/${(dataMessage.file as File).name}`;
    } else if (dataMessage.file.type.match(/text/)) {
      routeFile = `documents/${date}/${(dataMessage.file as File).name}`;
    }
    return uploadBytes(storageRef(storageRoot, routeFile), dataMessage.file as Blob)
      .then(snapshot => getDownloadURL(snapshot.ref))
      .then(url => {
        newDataMessage.file = {
          route: url,
          type: (dataMessage.file as File).type,
        };
        return push(ref(db, `messages/${date}`), newDataMessage);
      });
  } else {
    return push(ref(db, `messages/${date}`), newDataMessage);
  }
};

// Listen for messages
export const onGetMessages = (callback: (snapshot: { val: () => unknown }) => void): Unsubscribe => {
  const date = todayKey();
  return onValue(ref(db, `messages/${date}`), callback);
};

// Listen for members
export const onGetMembersActives = (callback: (snapshot: { val: () => unknown }) => void): Unsubscribe => {
  const date = todayKey();
  return onValue(ref(db, `members/${date}`), callback);
};
