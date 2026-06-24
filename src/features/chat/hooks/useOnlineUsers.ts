import { useState, useEffect } from 'react';
import { onGetUsers, onGetMembersActives } from '../services/chatService';
import type { User } from '../../../shared/types';

export const useOnlineUsers = () => {
  const [users, setUsers] = useState<Record<string, User>>({});
  const [members, setMembers] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const unsubUsers = onGetUsers((snapshot) => {
      const data = snapshot.val();
      if (data) setUsers(data);
    });

    const unsubMembers = onGetMembersActives((snapshot) => {
      const data = snapshot.val();
      if (data) setMembers(data);
    });

    return () => {
      unsubUsers();
      unsubMembers();
    };
  }, []);

  const onlineCount = Object.keys(users).filter((k) => Object.hasOwn(members, k) && members[k as keyof typeof members]).length;

  return { users, members, onlineCount };
};
