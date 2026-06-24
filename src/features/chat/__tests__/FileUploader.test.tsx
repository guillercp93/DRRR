import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import FileUploader from '../components/molecules/FileUploader';

describe('FileUploader', () => {
  it('renders upload button', () => {
    render(<FileUploader onChange={vi.fn()} />);
    const uploadBtn = screen.getByRole('button');
    expect(uploadBtn).toBeInTheDocument();
  });

  it('shows error dialog for unsupported file type', async () => {
    const onChange = vi.fn();
    const { container } = render(<FileUploader onChange={onChange} />);

    const file = new File(['test'], 'test.pdf', { type: '' });
    const input = container.querySelector('input[type="file"]') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [file] } });

    expect(screen.getByText(/the file is not an image/i)).toBeInTheDocument();
    expect(onChange).not.toHaveBeenCalled();
  });
});
