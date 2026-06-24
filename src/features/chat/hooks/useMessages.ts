import { useState, useEffect } from 'react';
import { onGetMessages } from '../services/chatService';
import type { Message } from '../../../shared/types';

export const useMessages = () => {
  const [messages, setMessages] = useState<Record<string, Message> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onGetMessages((snapshot) => {
      const data = snapshot.val();
      setMessages(data ?? {});
      setLoading(false);
    });

    return unsub;
  }, []);

  return { messages, loading };
};
