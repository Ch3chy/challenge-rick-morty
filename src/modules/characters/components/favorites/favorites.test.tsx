import { render, screen, fireEvent } from '@testing-library/react';
import Favorites from './favorites';
import { useSearchParams } from 'next/navigation';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import charactersReducer from '../../store/slices';
import { Character } from '../../types/characters.types';

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
}));

describe('Favorites', () => {
  const mockFavorites: Character[] = [
    {
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
      image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
      episode: []
    }
  ];

  const createTestStore = (initialState = {}) => {
    return configureStore({
      reducer: {
        characters: charactersReducer
      },
      preloadedState: {
        characters: {
          data: {
            favorites: mockFavorites,
            ...initialState
          },
        }
      }
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
  });

  it('should render the favorites button when list is closed', () => {
    const store = createTestStore();
    
    render(
      <Provider store={store}>
        <Favorites />
      </Provider>
    );

    expect(screen.getByText('Favs')).toBeInTheDocument();
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('should open the favorites list when button is clicked', () => {
    const store = createTestStore();
    
    render(
      <Provider store={store}>
        <Favorites />
      </Provider>
    );

    const button = screen.getByText('Favs');
    fireEvent.click(button);

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('listitem')).toHaveLength(mockFavorites.length);
  });

  it('should display all favorite characters', () => {
    const store = createTestStore();
    
    render(
      <Provider store={store}>
        <Favorites />
      </Provider>
    );

    const button = screen.getByText('Favs');
    fireEvent.click(button);

    mockFavorites.forEach(favorite => {
      expect(screen.getByText(favorite.name)).toBeInTheDocument();
    });
  });

  it('should display "No favorites" when list is empty', () => {
    const store = createTestStore({ favorites: [] });
    
    render(
      <Provider store={store}>
        <Favorites />
      </Provider>
    );

    const button = screen.getByText('Favs');
    fireEvent.click(button);

    expect(screen.getByText('No favorites')).toBeInTheDocument();
  });

  it('should include search params in character links', () => {
    const searchParams = new URLSearchParams('page=2&filter=alive');
    (useSearchParams as jest.Mock).mockReturnValue(searchParams);
    const store = createTestStore();
    
    render(
      <Provider store={store}>
        <Favorites />
      </Provider>
    );

    const button = screen.getByText('Favs');
    fireEvent.click(button);

    const links = screen.getAllByRole('link');
    links.forEach(link => {
      expect(link.getAttribute('href')).toContain('page=2');
      expect(link.getAttribute('href')).toContain('filter=alive');
    });
  });

  it('should close the list when clicking outside', () => {
    const store = createTestStore();
    
    render(
      <Provider store={store}>
        <Favorites />
      </Provider>
    );

    const button = screen.getByText('Favs');
    fireEvent.click(button);
    expect(screen.getByRole('list')).toBeInTheDocument();

    fireEvent.mouseDown(document.body);
    expect(screen.queryByRole('list')).not.toBeInTheDocument();
  });

  it('should apply custom className when provided', () => {
    const store = createTestStore();
    const customClass = 'custom-class';
    
    render(
      <Provider store={store}>
        <Favorites className={customClass} />
      </Provider>
    );

    const container = screen.getByText('Favs').parentElement;
    expect(container).toHaveClass(customClass);
  });
});
