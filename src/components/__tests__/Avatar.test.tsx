import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Avatar from '../Avatar';

describe('Avatar', () => {
  it('renders an image with the provided src and alt', () => {
    render(<Avatar src="/test.png" alt="Test avatar" />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', '/test.png');
    expect(img).toHaveAttribute('alt', 'Test avatar');
  });

  it('applies background color from the color prop', () => {
    render(<Avatar src="/test.png" alt="Test" color="#ff0000" />);
    const img = screen.getByRole('img');
    expect(img).toHaveStyle('background-color: #ff0000');
  });

  it('shows pointer cursor when onClick is provided', () => {
    render(<Avatar src="/test.png" alt="Test" onClick={() => {}} />);
    const img = screen.getByRole('img');
    expect(img).toHaveStyle('cursor: pointer');
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();
    render(<Avatar src="/test.png" alt="Test" onClick={handleClick} />);
    await user.click(screen.getByRole('figure'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders with default alt when not provided', () => {
    const { container } = render(<Avatar src="/test.png" />);
    const img = container.querySelector('img') as HTMLImageElement;
    expect(img).toHaveAttribute('alt', '');
  });
});
