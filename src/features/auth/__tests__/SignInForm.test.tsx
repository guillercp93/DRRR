import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SignInPage from '../pages/SignInPage';

vi.mock('../services/authService', () => ({
  doSignInWithEmailAndPassword: vi.fn(),
}));

vi.mock('../../chat/services/chatService', () => ({
  createMembersActives: vi.fn(),
}));

const renderSignIn = () =>
  render(
    <BrowserRouter>
      <SignInPage />
    </BrowserRouter>
  );

describe('SignIn', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the logo', () => {
    renderSignIn();
    const logo = screen.getByAltText('dollars');
    expect(logo).toBeInTheDocument();
  });

  it('renders email and password fields', () => {
    renderSignIn();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it('renders sign in button', () => {
    renderSignIn();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('shows a link to sign up', () => {
    renderSignIn();
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
  });
});
