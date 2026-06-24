import React, { useState, useRef } from 'react';
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface FileUploaderProps {
  onChange: (file: File) => void;
  baseColor?: string;
  activeColor?: string;
  overlayColor?: string;
}

const ACCEPTED_TYPES = /(image)?(audio)?(text)?\/+/;
const MAX_SIZE = 1_000_000; // 1MB

const FileUploader: React.FC<FileUploaderProps> = ({
  onChange,
  baseColor = 'white',
  activeColor = 'green',
  overlayColor = 'rgba(255,255,255,0.3)',
}) => {
  const [active, setActive] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
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
  };

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

  const borderColor = active ? activeColor : baseColor;
  const iconColor = active ? activeColor : loaded ? overlayColor : baseColor;

  return (
    <>
      <label
        className={`uploader-btn ${loaded ? 'loaded' : ''}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={{ outlineColor: borderColor }}
      >
        <IconButton component="span" sx={{ color: iconColor }}>
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
