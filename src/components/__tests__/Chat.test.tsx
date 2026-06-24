import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';
import Chat from '../Chat';

// Mock Firebase modules
vi.mock('../../lib/auth', () => ({
  doSignOut: vi.fn(),
  onAuthStateChangedListener: vi.fn((cb) => {
    cb({ uid: 'test-uid', email: 'test@test.com' });
    return vi.fn();
  }),
}));

vi.mock('../../lib/db', () => ({
  onGetUsers: vi.fn((cb) => {
    cb({ val: () => ({ 'test-uid': { username: 'TestUser', avatar: '', color: '#fff', email: 'test@test.com' } }) });
    return vi.fn();
  }),
  onGetMembersActives: vi.fn((cb) => {
    cb({ val: () => ({ 'test-uid': true }) });
    return vi.fn();
  }),
  onGetMessages: vi.fn((cb) => {
    cb({ val: () => ({}) });
    return vi.fn();
  }),
  doCreateMessage: vi.fn(),
  createMembersActives: vi.fn(),
}));

const renderChat = () =>
  render(
    <BrowserRouter>
      <AuthProvider>
        <Chat />
      </AuthProvider>
    </BrowserRouter>
  );

describe('Chat', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the chat logo', async () => {
    renderChat();
    const logo = await screen.findByAltText('dollars');
    expect(logo).toBeInTheDocument();
  });

  it('shows "No messages yet" when there are no messages', async () => {
    renderChat();
    const noMsg = await screen.findByText(/no messages yet/i);
    expect(noMsg).toBeInTheDocument();
  });

  it('renders chat rules button', async () => {
    renderChat();
    const rulesBtn = await screen.findByText(/chat rules/i);
    expect(rulesBtn).toBeInTheDocument();
  });

  it('renders logout button', async () => {
    renderChat();
    const logoutBtn = await screen.findByText(/log out/i);
    expect(logoutBtn).toBeInTheDocument();
  });
});
