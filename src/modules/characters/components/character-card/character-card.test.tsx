import { render, screen, fireEvent } from '@testing-library/react';
import CharacterCard from './character-card';
import { useSearchParams } from 'next/navigation';
import { Character } from '../../types/characters.types';

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
}));

describe('CharacterCard', () => {
  const mockCharacter: Character = {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: { name: 'Earth', url: '' },
    location: { name: 'Earth', url: '' },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    episode: []
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
  });

  it('should render character information correctly', () => {
    render(<CharacterCard character={mockCharacter} />);

    expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
    expect(screen.getByRole('img').getAttribute('src')).toContain(encodeURIComponent(mockCharacter.image));
    expect(screen.getByRole('img')).toHaveAttribute('alt', mockCharacter.name);
  });

  it('should apply active class when isActive is true', () => {
    render(<CharacterCard character={mockCharacter} isActive />);

    const card = screen.getByRole('link');
    expect(card).toHaveClass('active');
  });

  it('should not apply active class when isActive is false', () => {
    render(<CharacterCard character={mockCharacter} isActive={false} />);

    const card = screen.getByRole('link');
    expect(card).not.toHaveClass('active');
  });

  it('should apply liked class when isLiked is true', () => {
    render(<CharacterCard character={mockCharacter} isLiked />);

    const likeButton = screen.getByRole('button');
    expect(likeButton).toHaveClass('liked');
  });

  it('should call onLikeClick when like button is clicked', () => {
    const handleLike = jest.fn();
    render(<CharacterCard character={mockCharacter} onLikeClick={handleLike} />);

    const likeButton = screen.getByRole('button');
    fireEvent.click(likeButton);

    expect(handleLike).toHaveBeenCalledTimes(1);
  });

  it('should include search params in the link', () => {
    const searchParams = new URLSearchParams('page=2&filter=alive');
    (useSearchParams as jest.Mock).mockReturnValue(searchParams);

    render(<CharacterCard character={mockCharacter} />);

    const link = screen.getByRole('link');
    expect(link.getAttribute('href')).toContain('page=2');
    expect(link.getAttribute('href')).toContain('filter=alive');
  });
});
