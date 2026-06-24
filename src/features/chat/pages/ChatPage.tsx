import { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/contexts/useAuth';
import { useRequireAuth } from '../../auth/hooks/useRequireAuth';
import { doSignOut } from '../../auth/services/authService';
import { createMembersActives, doCreateMessage } from '../services/chatService';
import { useMessages } from '../hooks/useMessages';
import { useOnlineUsers } from '../hooks/useOnlineUsers';
import ChatHeader from '../components/organisms/ChatHeader';
import UserPanel from '../components/organisms/UserPanel';
import MessageList from '../components/organisms/MessageList';
import ActionPanel from '../components/organisms/ActionPanel';
import RulesDialog from '../components/organisms/RulesDialog';
import styles from './ChatPage.module.css';

const ChatPage: React.FC = () => {
  useRequireAuth((u) => !!u);
  const { user } = useAuth();
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [openModal, setOpenModal] = useState(false);

  const { messages } = useMessages();
  const { users, members, onlineCount } = useOnlineUsers();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleLogout = useCallback(() => {
    if (user) {
      createMembersActives(user.uid, false);
      doSignOut();
    }
    navigate('/');
  }, [user, navigate]);

  const handleSendMessage = useCallback(async (text: string, file: File | null) => {
    if (!user) return;
    await doCreateMessage({ author: user.uid, text, timestamp: Date.now(), file });
  }, [user]);

  return (
    <div className={styles.page}>
      <ChatHeader onlineCount={onlineCount} />
      <div className={styles.layout}>
        <UserPanel users={users} members={members} />
        <MessageList
          ref={scrollRef}
          messages={messages}
          users={users}
          currentUserId={user?.uid}
          onSendMessage={handleSendMessage}
        />
        <ActionPanel onLogout={handleLogout} onOpenRules={() => setOpenModal(true)} />
      </div>
      <RulesDialog open={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
};

export default ChatPage;
