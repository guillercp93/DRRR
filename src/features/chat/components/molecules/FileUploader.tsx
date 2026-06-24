import { useState, useRef, useCallback } from 'react';
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import styles from './FileUploader.module.css';

interface FileUploaderProps {
  onChange: (file: File) => void;
}

const ACCEPTED_TYPES = /(image)?(audio)?(text)?\/+/;
const MAX_SIZE = 1_000_000;

const FileUploader: React.FC<FileUploaderProps> = ({ onChange }) => {
  const [active, setActive] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.match(ACCEPTED_TYPES)) {
      setMessage(`The file is not an image, text or audio: ${file.type}`);
      setOpenModal(true);
      return;
    }

    if (file.size >= MAX_SIZE) {
      setMessage('The file is too large to load. Must be less than 1MB');
      setOpenModal(true);
      return;
    }

    setLoaded(true);
    setMessage(`The file "${file.name}" is ready to be sent.`);
    setOpenModal(true);
    onChange(file);
  }, [onChange]);

  const handleDragEnter = () => setActive(true);
  const handleDragLeave = () => setActive(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setActive(false);
    if (e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <>
      <label
        className={`${styles.uploaderBtn} ${loaded ? styles.loaded : ''} ${active ? styles.active : ''}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <IconButton component="span">
          <CloudUploadIcon />
        </IconButton>
        <input
          ref={inputRef}
          type="file"
          accept="audio/*,text/*,image/*"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </label>
      <Dialog open={openModal} onClose={() => setOpenModal(false)}>
        <DialogTitle>Upload File</DialogTitle>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FileUploader;
