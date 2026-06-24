import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

vi.mock('../../auth/contexts/AuthContext', () => ({
  useAuth: vi.fn(() => ({ user: { uid: 'test-uid', email: 'test@test.com' }, loading: false })),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock('../../auth/services/authService', () => ({
  doSignOut: vi.fn(),
  onAuthStateChangedListener: vi.fn((cb: (user: unknown) => void) => {
    cb({ uid: 'test-uid', email: 'test@test.com' });
    return vi.fn();
  }),
}));

vi.mock('../services/chatService', () => ({
  onGetUsers: vi.fn((cb: (s: { val: () => unknown }) => void) => {
    cb({ val: () => ({ 'test-uid': { username: 'TestUser', avatar: '', color: '#fff', email: 'test@test.com' } }) });
    return vi.fn();
  }),
  onGetMembersActives: vi.fn((cb: (s: { val: () => unknown }) => void) => {
    cb({ val: () => ({ 'test-uid': true }) });
    return vi.fn();
  }),
  onGetMessages: vi.fn((cb: (s: { val: () => unknown }) => void) => {
    cb({ val: () => ({}) });
    return vi.fn();
  }),
  doCreateMessage: vi.fn(),
  createMembersActives: vi.fn(),
}));

import ChatPage from '../pages/ChatPage';

const renderChat = () =>
  render(
    <BrowserRouter>
      <ChatPage />
    </BrowserRouter>
  );

describe('ChatPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the header with logo and title', () => {
    renderChat();
    expect(screen.getByAltText('dollars')).toBeInTheDocument();
    expect(screen.getByText('Dollars Chat')).toBeInTheDocument();
  });

  it('renders chat rules and logout buttons', () => {
    renderChat();
    expect(screen.getByRole('button', { name: /chat rules/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /log out/i })).toBeInTheDocument();
  });

  it('renders the online user count', () => {
    renderChat();
    expect(screen.getAllByText(/online/i).length).toBeGreaterThanOrEqual(1);
  });

  it('renders the message input field', () => {
    renderChat();
    expect(screen.getByPlaceholderText(/write your message/i)).toBeInTheDocument();
  });
});
