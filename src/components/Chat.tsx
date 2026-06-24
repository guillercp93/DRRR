import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import {
  Box,
  TextField,
  Typography,
  Button,
  IconButton,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PeopleIcon from '@mui/icons-material/People';

import { useAuth } from '../contexts/AuthContext';
import { useRequireAuth } from '../hooks/useRequireAuth';
import {
  onGetUsers,
  onGetMembersActives,
  onGetMessages,
  doCreateMessage,
  createMembersActives,
} from '../lib/db';
import { doSignOut } from '../lib/auth';
import Avatar from './Avatar';
import FileUploader from './FileUploader';
import Multimedia from './Multimedia';

interface UserData {
  username: string;
  avatar: string;
  color: string;
  email: string;
}

interface MessageData {
  author: string;
  text: string;
  timestamp: number;
  file?: { route: string; type: string } | null;
}

const Chat: React.FC = () => {
  useRequireAuth((user) => !!user);
  const { user } = useAuth();
  const navigate = useNavigate();

  const [users, setUsers] = useState<Record<string, UserData>>({});
  const [members, setMembers] = useState<Record<string, boolean>>({});
  const [messages, setMessages] = useState<Record<string, MessageData> | null>(null);
  const [inputMessage, setInputMessage] = useState('');
  const [inputFile, setInputFile] = useState<File | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  const onlineCount = Object.keys(users).filter((k) => members[k]).length;

  useEffect(() => {
    const unsubMembers = onGetMembersActives((snapshot) => {
      const data = snapshot.val();
      if (data) setMembers(data as Record<string, boolean>);
    });
    const unsubMessages = onGetMessages((snapshot) => {
      const data = snapshot.val();
      setMessages(data ? (data as Record<string, MessageData>) : {});
    });

    const unsubUsers = onGetUsers((snapshot) => {
      const data = snapshot.val();
      if (data) setUsers(data as Record<string, UserData>);
    });

    return () => {
      unsubMembers();
      unsubMessages();
      unsubUsers();
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!user) return;
    const dataMessage = {
      author: user.uid,
      text: inputMessage,
      timestamp: Date.now(),
      file: inputFile,
    };
    setLoading(true);
    try {
      await doCreateMessage(dataMessage);
      setInputMessage('');
      setInputFile(null);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (evt: React.KeyboardEvent) => {
    if (evt.key === 'Enter' && !evt.shiftKey) {
      evt.preventDefault();
      if (inputMessage.trim() && !loading) {
        handleSendMessage();
      }
    }
  };

  const handleLogout = () => {
    if (user) {
      createMembersActives(user.uid, false);
      doSignOut();
    }
    navigate('/');
  };

  const messageKeys = messages ? Object.keys(messages).reverse() : [];

  return (
    <div className="chat-page">
      {/* Header */}
      <header className="chat-header">
        <img src="/images/logo.jpg" alt="dollars" className="chat-header-logo" />
        <span className="chat-header-title">Dollars Chat</span>
        <div className="chat-header-status">
          <span className="chat-header-status-dot" />
          <span>{onlineCount} online</span>
        </div>
      </header>

      {/* Main Layout */}
      <div className="chat-layout">
        {/* Left: Online Users */}
        <aside className="user-panel">
          <h2 className="user-panel-title">
            <PeopleIcon />
            Online
          </h2>
          <ul className="user-list">
            {Object.keys(users).map(
              (key) =>
                members[key] && (
                  <li key={key}>
                    <Avatar src={users[key].avatar} width={24} height={24} color={users[key].color} />
                    <span className="username">{users[key].username}</span>
                  </li>
                )
            )}
          </ul>
        </aside>

        {/* Center: Messages */}
        <main className="messages-panel">
          <div className="messages-scroll" ref={scrollRef}>
            {messages && Object.keys(users).length > 0 ? (
              messageKeys.length > 0 ? (
                [...messageKeys].reverse().map((id) => {
                  const msg = messages[id];
                  const u = users[msg.author];
                  const isOwn = user && msg.author === user.uid;
                  return (
                    <div key={id} className={`msg${isOwn ? ' own' : ''}`}>
                      <div className="msg-avatar">
                        <Avatar src={u?.avatar} width={28} height={28} color={u?.color} />
                      </div>
                      <div className="msg-body">
                        <div className="msg-meta">
                          <span className="msg-author" style={isOwn ? { color: 'var(--accent)' } : { color: u?.color || 'var(--text-secondary)' }}>
                            {u?.username || 'Unknown'}
                          </span>
                          <span className="msg-time">
                            {format(new Date(msg.timestamp), 'HH:mm')}
                          </span>
                        </div>
                        <div className="msg-bubble">
                          {msg.file && (
                            <div className="multimedia">
                              <Multimedia file={msg.file} text={msg.text} id={`media_${id}`} />
                            </div>
                          )}
                          {msg.text}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="messages-empty">No messages yet</div>
              )
            ) : (
              <div className="messages-empty">Loading messages...</div>
            )}
          </div>

          {/* Input */}
          {user && users[user.uid] && (
            <div className="chat-input-area">
              <div className="chat-input-row">
                <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <FileUploader onChange={(file: File) => setInputFile(file)} />
                </div>
                <TextField
                  placeholder="Write your message…"
                  multiline
                  maxRows={4}
                  value={inputMessage}
                  onKeyDown={handleKeyDown}
                  onChange={(e) => setInputMessage(e.target.value)}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleSendMessage}
                            disabled={loading || !inputMessage.trim()}
                            size="small"
                          >
                            {loading ? <CircularProgress size={20} /> : <SendIcon />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </div>
              {inputFile && (
                <div className="file-label">{inputFile.name}</div>
              )}
            </div>
          )}
        </main>

        {/* Right: Actions */}
        <aside className="actions-panel">
          <Button
            variant="outlined"
            onClick={() => setOpenModal(true)}
            startIcon={<ListAltIcon />}
          >
            Chat rules
          </Button>
          <Button
            variant="outlined"
            onClick={handleLogout}
            startIcon={<ExitToAppIcon />}
          >
            Log out
          </Button>
          <div className="signature">
            <img src="/images/firma_light.svg" alt="By Guiller" />
          </div>
        </aside>
      </div>

      {/* Rules Dialog */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle className="chat-rules-title">Chat Rules</DialogTitle>
        <DialogContent>
          <Box sx={{ color: 'text.secondary' }}>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Prohibited Acts
            </Typography>
            <ul className="chat-rules-list">
              <li>Advertising</li>
              <li>Acts violating public order/customs (Racism, bigotry, harassment etc.)</li>
              <li>Acts that violate the rights of other users</li>
              <li>Acting in violation of the common laws and regulations of government</li>
              <li>Criminal acts and conduct leading to criminal acts</li>
              <li>Acts which transmit (harmful) false information (especially posing as or lying to the site staff)</li>
              <li>Posting personal information that may be an invasion of privacy</li>
            </ul>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} variant="outlined">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Chat;
