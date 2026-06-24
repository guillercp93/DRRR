import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  TextField,
  Button,
  Snackbar,
  Alert,
  InputAdornment,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { doSignInWithEmailAndPassword } from '../../services/authService';
import { createMembersActives } from '../../../chat/services/chatService';

interface SignInFormProps {
  onSuccess: () => void;
}

const SignInForm: React.FC<SignInFormProps> = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();
    try {
      const { user } = await doSignInWithEmailAndPassword(email, password);
      await createMembersActives(user.uid, true);
      setEmail('');
      setPassword('');
      onSuccess();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
          autoFocus
          autoComplete="email"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            },
          }}
        />
        <TextField
          label="Password (6–15 characters)"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
          autoComplete="current-password"
          slotProps={{
            htmlInput: { minLength: 6, maxLength: 15 },
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            },
          }}
        />
        <Button type="submit" variant="outlined" fullWidth>
          Sign in
        </Button>
      </form>

      <div className="auth-divider">or</div>

      <Link to="/signup" style={{ textDecoration: 'none' }}>
        <Button type="button" variant="outlined" fullWidth>
          Sign up
        </Button>
      </Link>

      <Snackbar
        open={error !== ''}
        autoHideDuration={9000}
        onClose={() => setError('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setError('')} severity="error" variant="filled">
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default SignInForm;
