import styles from './ChatHeader.module.css';

interface ChatHeaderProps {
  onlineCount: number;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onlineCount }) => {
  return (
    <header className={styles.header}>
      <img src="/images/logo.jpg" alt="dollars" className={styles.logo} />
      <span className={styles.title}>Dollars Chat</span>
      <div className={styles.status}>
        <span className={styles.dot} />
        <span>{onlineCount} online</span>
      </div>
    </header>
  );
};

export default ChatHeader;
