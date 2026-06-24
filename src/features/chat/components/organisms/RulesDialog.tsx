import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, Typography } from '@mui/material';
import styles from './RulesDialog.module.css';

interface RulesDialogProps {
  open: boolean;
  onClose: () => void;
}

const RULES = [
  'Advertising',
  'Acts violating public order/customs (Racism, bigotry, harassment etc.)',
  'Acts that violate the rights of other users',
  'Acting in violation of the common laws and regulations of government',
  'Criminal acts and conduct leading to criminal acts',
  'Acts which transmit (harmful) false information (especially posing as or lying to the site staff)',
  'Posting personal information that may be an invasion of privacy',
];

const RulesDialog: React.FC<RulesDialogProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle className={styles.title}>Chat Rules</DialogTitle>
      <DialogContent>
        <Box sx={{ color: 'text.secondary' }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Prohibited Acts
          </Typography>
          <ul className={styles.list}>
            {RULES.map((rule, i) => (
              <li key={i}>{rule}</li>
            ))}
          </ul>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RulesDialog;
