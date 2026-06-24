import { useState } from 'react';
import {
  TextField,
  IconButton,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import FileUploader from './FileUploader';
import styles from './ChatInput.module.css';

interface ChatInputProps {
  onSend: (text: string, file: File | null) => Promise<void>;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const [inputMessage, setInputMessage] = useState('');
  const [inputFile, setInputFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const hasContent = inputMessage.trim() !== '' || inputFile !== null;

  const handleSendMessage = async () => {
    if (!inputMessage.trim() && !inputFile) return;
    setLoading(true);
    try {
      await onSend(inputMessage, inputFile);
      setInputMessage('');
      setInputFile(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (evt: React.KeyboardEvent) => {
    if (evt.key === 'Enter' && !evt.shiftKey) {
      evt.preventDefault();
      if (hasContent && !loading) {
        handleSendMessage();
      }
    }
  };

  return (
    <div className={styles.area}>
      <TextField
        className={styles.field}
        placeholder="Transmit a message…"
        multiline
        maxRows={4}
        value={inputMessage}
        onKeyDown={handleKeyDown}
        onChange={(e) => setInputMessage(e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <FileUploader onChange={(file: File) => setInputFile(file)} />
              </InputAdornment>
            ),
            endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleSendMessage}
                    disabled={loading || !hasContent}
                    size="small"
                    className={
                      loading
                        ? undefined
                        : hasContent
                          ? `${styles.sendBtn} ${styles.sendActive}`
                          : styles.sendBtn
                    }
                  >
                    {loading ? <CircularProgress size={20} /> : <SendIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      {inputFile && (
        <div className={styles.fileLabel}>
          <span>◆</span> {inputFile.name}
        </div>
      )}
    </div>
  );
};

export default ChatInput;
