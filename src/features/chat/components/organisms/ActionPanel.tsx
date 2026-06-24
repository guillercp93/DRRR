import { Button } from '@mui/material';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import styles from './ActionPanel.module.css';

interface ActionPanelProps {
  onLogout: () => void;
  onOpenRules: () => void;
}

const ActionPanel: React.FC<ActionPanelProps> = ({ onLogout, onOpenRules }) => {
  return (
    <aside className={styles.panel}>
      <Button
        variant="outlined"
        onClick={onOpenRules}
        startIcon={<ListAltIcon />}
      >
        Chat rules
      </Button>
      <Button
        variant="outlined"
        onClick={onLogout}
        startIcon={<ExitToAppIcon />}
      >
        Log out
      </Button>
      <div className={styles.signature}>
        <img src="/images/firma_light.svg" alt="By Guiller" />
      </div>
    </aside>
  );
};

export default ActionPanel;
