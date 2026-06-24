import { useState, useRef, useCallback } from 'react';
import {
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Card,
  CardActions,
  IconButton,
  LinearProgress,
  Zoom,
} from '@mui/material';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import PauseCircleFilledIcon from '@mui/icons-material/PauseCircleFilled';
import type { FileData } from '../../../../shared/types';

interface MultimediaProps {
  file: FileData;
  text: string;
  id: string;
}

const Multimedia: React.FC<MultimediaProps> = ({ file, text, id }) => {
  const [open, setOpen] = useState(false);
  const [onPlay, setOnPlay] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleClose = () => setOpen(false);

  const toggleOnPlay = useCallback((playing: boolean) => setOnPlay(playing), []);

  const playSound = () => {
    const player = audioRef.current;
    if (!player) return;
    if (player.paused || player.ended) {
      player.play();
    } else {
      player.pause();
    }
  };

  const handleTimeUpdate = () => {
    const player = audioRef.current;
    if (player && player.duration) {
      setCurrentTime((player.currentTime / player.duration) * 100);
    }
  };

  if (file.type.match(/(image)+/)) {
    return (
      <Paper sx={{ textAlign: 'center' }}>
        <img
          src={file.route}
          width="30%"
          height="30%"
          alt=""
          style={{ cursor: 'pointer' }}
          onClick={() => setOpen(true)}
        />
        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="md"
          TransitionComponent={Zoom}
        >
          <DialogTitle>
            <Typography noWrap variant="h5" align="left">
              {text}
            </Typography>
          </DialogTitle>
          <DialogContent>
            <figure>
              <img src={file.route} width="100%" height="100%" alt="img1" />
            </figure>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    );
  }

  if (file.type.match(/(audio)+/)) {
    return (
      <Card>
        <audio
          ref={audioRef}
          controls
          id={id}
          onPlay={() => toggleOnPlay(true)}
          onPause={() => toggleOnPlay(false)}
          onTimeUpdate={handleTimeUpdate}
        >
          <source src={file.route} type={file.type} />
          Your browser does not support the audio element.
        </audio>
        <CardActions>
          <IconButton aria-label="Play/pause" onClick={playSound}>
            {!onPlay ? (
              <PlayCircleFilledIcon />
            ) : (
              <PauseCircleFilledIcon />
            )}
          </IconButton>
        </CardActions>
        <LinearProgress
          color="primary"
          variant="determinate"
          value={currentTime}
        />
      </Card>
    );
  }

  return null;
};

export default Multimedia;
