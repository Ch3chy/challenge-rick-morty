import { render, screen, fireEvent } from '@testing-library/react';
import ArrowButton from './arrow-button';

describe('ArrowButton', () => {
  it('should render the button with default props', () => {
    render(<ArrowButton />);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
  });

  it('should apply custom className when provided', () => {
    const customClass = 'custom-class';
    render(<ArrowButton className={customClass} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass(customClass);
  });

  it('should be disabled when disabled prop is true', () => {
    render(<ArrowButton disabled />);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('should call onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<ArrowButton onClick={handleClick} />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should not call onClick handler when disabled', () => {
    const handleClick = jest.fn();
    render(<ArrowButton onClick={handleClick} disabled />);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('should render the CaretRight icon', () => {
    render(<ArrowButton />);
    
    const icon = screen.getByTestId('caret-right-icon');
    expect(icon).toBeInTheDocument();
  });
});
