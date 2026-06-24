import PeopleIcon from '@mui/icons-material/People';
import Avatar from '../../../../shared/components/atoms/Avatar';
import type { User } from '../../../../shared/types';
import styles from './UserPanel.module.css';

interface UserPanelProps {
  users: Record<string, User>;
  members: Record<string, boolean>;
}

const UserPanel: React.FC<UserPanelProps> = ({ users, members }) => {
  return (
    <aside className={styles.panel}>
      <h2 className={styles.title}>
        <PeopleIcon />
        SIGNAL DETECTED
      </h2>
      <ul className={styles.list}>
        {Object.keys(users).map(
          (key) =>
            members[key] && (
              <li key={key}>
                <Avatar src={users[key].avatar} width={22} height={22} color={users[key].color} />
                <span className={styles.username}>{users[key].username}</span>
              </li>
            )
        )}
      </ul>
    </aside>
  );
};

export default UserPanel;
