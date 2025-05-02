import { render, screen } from '@testing-library/react';
import CarouselMobile from './carousel-mobile';
import { useParams, useSearchParams } from 'next/navigation';
import { Character } from '../../types/characters.types';

jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe('CarouselMobile', () => {
  const mockCharacters: Character[] = [
    { 
      id: 1, 
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth', url: '' },
      location: { name: 'Earth', url: '' },
      image: '',
      episode: []
    },
    { 
      id: 2, 
      name: 'Morty Smith',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth', url: '' },
      location: { name: 'Earth', url: '' },
      image: '',
      episode: []
    },
    { 
      id: 3, 
      name: 'Commander Rick',
      status: 'Dead',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: { name: 'Earth', url: '' },
      location: { name: 'Earth', url: '' },
      image: '',
      episode: []
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
  });

  it('should render with children', () => {
    (useParams as jest.Mock).mockReturnValue({ characterId: '2' });
    
    render(
      <CarouselMobile characters={mockCharacters}>
        <div>Test Content</div>
      </CarouselMobile>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('should render both arrow buttons', () => {
    (useParams as jest.Mock).mockReturnValue({ characterId: '2' });
    
    render(<CarouselMobile characters={mockCharacters} />);

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(2);
  });

  it('should disable left arrow when on first character', () => {
    (useParams as jest.Mock).mockReturnValue({ characterId: '1' });
    
    render(<CarouselMobile characters={mockCharacters} />);

    const leftArrow = screen.getAllByRole('button')[0];
    expect(leftArrow).toBeDisabled();
  });

  it('should disable right arrow when on last character', () => {
    (useParams as jest.Mock).mockReturnValue({ characterId: '3' });
    
    render(<CarouselMobile characters={mockCharacters} />);

    const rightArrow = screen.getAllByRole('button')[1];
    expect(rightArrow).toBeDisabled();
  });

  it('should enable both arrows when on middle character', () => {
    (useParams as jest.Mock).mockReturnValue({ characterId: '2' });
    
    render(<CarouselMobile characters={mockCharacters} />);

    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).not.toBeDisabled();
    });
  });

  it('should include search params in navigation links', () => {
    const searchParams = new URLSearchParams('page=2&filter=alive');
    (useParams as jest.Mock).mockReturnValue({ characterId: '2' });
    (useSearchParams as jest.Mock).mockReturnValue(searchParams);
    
    render(<CarouselMobile characters={mockCharacters} />);

    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link.getAttribute('href')).toContain('page=2');
      expect(link.getAttribute('href')).toContain('filter=alive');
    });
  });
});
