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
      if ((inputMessage.trim() || inputFile) && !loading) {
        handleSendMessage();
      }
    }
  };

  return (
    <div className={styles.area}>
      <div className={styles.row}>
        <div className={styles.fileWrap}>
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
                    disabled={loading || (!inputMessage.trim() && !inputFile)}
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
        <div className={styles.fileLabel}>{inputFile.name}</div>
      )}
    </div>
  );
};

export default ChatInput;
