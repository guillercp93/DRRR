import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import SignUpPage from '../pages/SignUpPage';

vi.mock('../services/authService', () => ({
  doCreateUserWithEmailAndPassword: vi.fn(),
}));

vi.mock('../../chat/services/chatService', () => ({
  doCreateUser: vi.fn(),
}));

const renderSignUp = () =>
  render(
    <BrowserRouter>
      <SignUpPage />
    </BrowserRouter>
  );

describe('SignUp', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the logo', () => {
    renderSignUp();
    expect(screen.getByAltText('dollars')).toBeInTheDocument();
  });

  it('renders username, email, and password fields', () => {
    renderSignUp();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getAllByLabelText(/password/i)).toHaveLength(2);
  });

  it('renders avatar selection grid', () => {
    const { container } = renderSignUp();
    const images = container.querySelectorAll('img');
    expect(images.length).toBeGreaterThan(2);
  });

  it('renders back and sign up buttons', () => {
    renderSignUp();
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument();
  });
});
