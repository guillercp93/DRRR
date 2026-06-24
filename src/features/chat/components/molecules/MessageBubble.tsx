import { memo } from 'react';
import { format } from 'date-fns';
import Avatar from '../../../../shared/components/atoms/Avatar';
import Multimedia from './Multimedia';
import type { Message, User } from '../../../../shared/types';
import styles from './MessageBubble.module.css';

interface MessageBubbleProps {
  message: Message;
  user: User | undefined;
  isOwn: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, user, isOwn }) => {
  return (
    <div className={`${styles.msg} ${isOwn ? styles.own : ''}`}>
      <div className={styles.avatarWrap}>
        <Avatar src={user?.avatar} width={28} height={28} color={user?.color} />
      </div>
      <div className={styles.body}>
        <div className={styles.meta}>
          <span
            className={`${styles.author} ${isOwn ? styles.ownAuthor : ''}`}
            style={!isOwn && user?.color ? { color: user.color } : undefined}
          >
            {user?.username || 'Unknown'}
          </span>
          <span className={styles.time}>
            {format(new Date(message.timestamp), 'HH:mm')}
          </span>
        </div>
        <div className={`${styles.bubble} ${isOwn ? styles.ownBubble : styles.otherBubble}`}>
          {message.file && (
            <div className={styles.multimedia}>
              <Multimedia file={message.file} text={message.text} id={`media_${message.timestamp}`} />
            </div>
          )}
          {message.text}
        </div>
      </div>
    </div>
  );
};

export default memo(MessageBubble);
