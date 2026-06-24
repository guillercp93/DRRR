import { ref, set, push, update, get, onValue, Unsubscribe } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../../lib/firebase';
import { todayKey } from '../../../shared/utils/format';
import type { User, Message, MessagePayload } from '../../../shared/types';

const storageRoot = storageRef(storage);

export const doCreateUser = (id: string, dataUser: User) => {
  return set(ref(db, `users/${id}`), dataUser);
};

export const onceGetUsers = () => {
  return get(ref(db, '/users'));
};

export const onGetUsers = (callback: (snapshot: { val: () => Record<string, User> | null }) => void): Unsubscribe => {
  return onValue(ref(db, '/users'), (snapshot) => callback(snapshot));
};

export const createMembersActives = (id: string, value: boolean) => {
  const date = todayKey();
  return update(ref(db, `members/${date}`), { [id]: value });
};

export const doCreateMessage = (dataMessage: MessagePayload) => {
  const date = todayKey();
  const newDataMessage: Record<string, unknown> = { ...dataMessage };

  if (dataMessage.file) {
    let routeFile = '';
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

export const onGetMessages = (callback: (snapshot: { val: () => Record<string, Message> | null }) => void): Unsubscribe => {
  const date = todayKey();
  return onValue(ref(db, `messages/${date}`), (snapshot) => callback(snapshot));
};

export const onGetMembersActives = (callback: (snapshot: { val: () => Record<string, boolean> | null }) => void): Unsubscribe => {
  const date = todayKey();
  return onValue(ref(db, `members/${date}`), (snapshot) => callback(snapshot));
};
