import styles from './ChatHeader.module.css';

interface ChatHeaderProps {
  onlineCount: number;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onlineCount }) => {
  return (
    <header className={styles.header}>
      <img src="/images/logo.jpg" alt="dollars" className={styles.logo} />
      <span className={styles.title}>Dollars Chat</span>
      <span className={styles.freq}>FREQ: DOLLARS</span>
      <div className={styles.status}>
        <div className={styles.signalBars}>
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </div>
        <span className={styles.statusText}>{onlineCount} online</span>
      </div>
    </header>
  );
};

export default ChatHeader;
