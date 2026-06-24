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
      <div className={styles.section}>
        <span className={styles.sectionLabel}>Channel</span>
        <Button
          variant="outlined"
          onClick={onOpenRules}
          startIcon={<ListAltIcon />}
        >
          Chat rules
        </Button>
      </div>
      <div className={styles.section}>
        <span className={styles.sectionLabel}>Connection</span>
        <Button
          variant="outlined"
          onClick={onLogout}
          startIcon={<ExitToAppIcon />}
        >
          Log out
        </Button>
      </div>
      <div className={styles.signature}>
        <img src="/images/firma_light.svg" alt="By Guiller" />
      </div>
    </aside>
  );
};

export default ActionPanel;
