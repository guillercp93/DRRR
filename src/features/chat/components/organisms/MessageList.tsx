import { forwardRef } from 'react';
import MessageBubble from '../molecules/MessageBubble';
import ChatInput from '../molecules/ChatInput';
import type { Message, User } from '../../../../shared/types';
import styles from './MessageList.module.css';

interface MessageListProps {
  messages: Record<string, Message> | null;
  users: Record<string, User>;
  currentUserId: string | undefined;
  onSendMessage: (text: string, file: File | null) => Promise<void>;
}

const MessageList = forwardRef<HTMLDivElement, MessageListProps>(
  ({ messages, users, currentUserId, onSendMessage }, ref) => {
    const messageKeys = messages ? Object.keys(messages).reverse() : [];

    return (
      <main className={styles.panel}>
        <div className={styles.scroll} ref={ref}>
          {messages && Object.keys(users).length > 0 ? (
            messageKeys.length > 0 ? (
              [...messageKeys].reverse().map((id) => {
                const msg = messages[id];
                const u = users[msg.author];
                const isOwn = currentUserId === msg.author;
                return (
                  <MessageBubble
                    key={id}
                    message={msg}
                    user={u}
                    isOwn={isOwn}
                  />
                );
              })
            ) : (
              <div className={styles.empty}>Awaiting signal…</div>
            )
          ) : (
            <div className={styles.empty}>Tuning in…</div>
          )}
        </div>
        {currentUserId && users[currentUserId] && (
          <ChatInput onSend={onSendMessage} />
        )}
      </main>
    );
  }
);

export default MessageList;
