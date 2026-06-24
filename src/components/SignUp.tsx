import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { HuePicker } from 'react-color';
import {
  TextField,
  Button,
  Snackbar,
  Alert,
  InputAdornment,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import Avatar from './Avatar';
import { doCreateUserWithEmailAndPassword } from '../lib/auth';
import { doCreateUser } from '../lib/db';

const AVATAR_COUNT = 14;
const avatarNumbers = Array.from({ length: AVATAR_COUNT }, (_, i) => i + 1);

export const SignUpLink: React.FC = () => (
  <Link to="/signup" style={{ textDecoration: 'none' }}>
    <Button type="button" variant="outlined" fullWidth>
      Sign up
    </Button>
  </Link>
);

const SignUpForm: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [passwordOne, setPasswordOne] = useState('');
  const [passwordTwo, setPasswordTwo] = useState('');
  const [avatar, setAvatar] = useState('/images/avatars/1.png');
  const [color, setColor] = useState('#b000ff');
  const [error, setError] = useState<string | null>(null);

  const isValid =
    username.length >= 3 &&
    email !== '' &&
    passwordOne.length >= 6 &&
    passwordOne === passwordTwo;

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();

    if (passwordOne !== passwordTwo) {
      setError('Passwords do not match');
      return;
    }

    try {
      const dataUser = await doCreateUserWithEmailAndPassword(email, passwordOne);
      await doCreateUser(dataUser.user.uid, {
        username,
        avatar,
        color,
        email,
      });
      setUsername('');
      setEmail('');
      setPasswordOne('');
      setPasswordTwo('');
      setAvatar('/images/avatars/1.png');
      setColor('#b000ff');
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
        <div className="signup-layout">
          <div className="avatar-section">
            <h2>Choose Avatar</h2>
            <div className="avatar-preview">
              <Avatar src={avatar} width={130} height={130} color={color} />
            </div>
            <div className="avatar-grid">
              {avatarNumbers.map((num) => (
                <Avatar
                  key={num}
                  src={`/images/avatars/${num}.png`}
                  width={44}
                  height={44}
                  color={color}
                  onClick={() => setAvatar(`/images/avatars/${num}.png`)}
                />
              ))}
            </div>
          </div>

          <div className="form-section">
            <TextField
              label="Username (3–10 characters)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              fullWidth
              autoFocus
              autoComplete="username"
              slotProps={{
                htmlInput: {
                  pattern: '([A-Za-z0-9_]+){3,10}',
                  title:
                    'The username must have from 3 to 10 characters, uppercase and lowercase, underscore character.',
                },
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <TextField
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
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
              value={passwordOne}
              onChange={(e) => setPasswordOne(e.target.value)}
              required
              fullWidth
              autoComplete="new-password"
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
            <TextField
              label="Repeat password"
              type="password"
              value={passwordTwo}
              onChange={(e) => setPasswordTwo(e.target.value)}
              required
              fullWidth
              error={passwordTwo !== '' && passwordOne !== passwordTwo}
              helperText={
                passwordTwo !== '' && passwordOne !== passwordTwo
                  ? 'Passwords do not match'
                  : ''
              }
              autoComplete="new-password"
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

            <div>
              <div className="color-picker-label">Pick your color</div>
              <HuePicker
                color={color}
                width="100%"
                onChangeComplete={(c) => setColor(c.hex)}
              />
            </div>

            <div className="form-actions">
              <Button type="submit" variant="outlined" disabled={!isValid}>
                Sign up
              </Button>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <Button type="button" variant="outlined">
                  Back
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </form>

      <Snackbar
        open={error !== null}
        autoHideDuration={9000}
        onClose={() => setError(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={() => setError(null)} severity="error" variant="filled">
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="signup-page">
      <img
        src="/images/logo.jpg"
        alt="dollars"
        className="auth-logo"
      />
      <div className="signup-card">
        <h1>Join the Dollars</h1>
        <SignUpForm onSuccess={() => navigate('/')} />
      </div>
    </div>
  );
};

export default SignUp;
