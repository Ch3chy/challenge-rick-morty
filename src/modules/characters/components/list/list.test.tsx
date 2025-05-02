import { render, screen, fireEvent } from "@testing-library/react";
import List from "./list";
import { useParams, useSearchParams } from "next/navigation";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import charactersReducer from "../../store/slices";
import { Character } from "../../types/characters.types";

jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe("List", () => {
  const mockCharacters: Character[][] = [
    [
      {
        id: 1,
        name: "Rick Sanchez",
        status: "Alive",
        species: "Human",
        type: "",
        gender: "Male",
        origin: { name: "Earth", url: "" },
        location: { name: "Earth", url: "" },
        image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
        episode: [],
      },
      {
        id: 2,
        name: "Morty Smith",
        status: "Alive",
        species: "Human",
        type: "",
        gender: "Male",
        origin: { name: "Earth", url: "" },
        location: { name: "Earth", url: "" },
        image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
        episode: [],
      },
    ],
    [
      {
        id: 3,
        name: "Summer Smith",
        status: "Alive",
        species: "Human",
        type: "",
        gender: "Female",
        origin: { name: "Earth", url: "" },
        location: { name: "Earth", url: "" },
        image: "https://rickandmortyapi.com/api/character/avatar/3.jpeg",
        episode: [],
      },
    ],
  ];

  const mockFavorites: Character[] = [mockCharacters[0][0]];

  const createTestStore = (initialState = {}) => {
    return configureStore({
      reducer: {
        characters: charactersReducer,
      },
      preloadedState: {
        characters: {
          data: {
            favorites: mockFavorites,
            ...initialState,
          },
        },
      },
    });
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useParams as jest.Mock).mockReturnValue({ characterId: "1" });
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
  });

  it("should render all characters in the current group", () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <List characters={mockCharacters} />
      </Provider>
    );

    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getByText("Morty Smith")).toBeInTheDocument();
    expect(screen.queryByText("Summer Smith")).not.toBeInTheDocument();
  });

  it("should mark the active character", () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <List characters={mockCharacters} />
      </Provider>
    );

    const rickCard = screen.getByText("Rick Sanchez").closest("a");
    expect(rickCard).toHaveClass("active");
  });

  it("should show favorite status correctly", () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <List characters={mockCharacters} />
      </Provider>
    );

    const rickCard = screen.getByText("Rick Sanchez").closest("a");
    const rickLikeButton = rickCard?.querySelector("button");
    expect(rickLikeButton).toHaveClass("liked");

    const mortyCard = screen.getByText("Morty Smith").closest("a");
    const mortyLikeButton = mortyCard?.querySelector("button");
    expect(mortyLikeButton).not.toHaveClass("liked");
  });

  it("should handle like button clicks", () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <List characters={mockCharacters} />
      </Provider>
    );

    const mortyCard = screen.getByText("Morty Smith").closest("a");
    const mortyLikeButton = mortyCard?.querySelector("button");
    fireEvent.click(mortyLikeButton!);

    const actions = store.getState().characters.data.favorites;
    expect(actions).toContainEqual(expect.objectContaining({ id: 2 }));
  });

  it("should handle unlike button clicks", () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <List characters={mockCharacters} />
      </Provider>
    );

    const rickCard = screen.getByText("Rick Sanchez").closest("a");
    const rickLikeButton = rickCard?.querySelector("button");
    fireEvent.click(rickLikeButton!);

    const actions = store.getState().characters.data.favorites;
    expect(actions).not.toContainEqual(expect.objectContaining({ id: 1 }));
  });

  it("should apply custom className when provided", () => {
    const store = createTestStore();
    const customClass = "custom-class";

    render(
      <Provider store={store}>
        <List characters={mockCharacters} className={customClass} />
      </Provider>
    );

    const list = screen.getByTestId("characters-list");
    expect(list).toHaveClass(customClass);
  });

  it("should switch to correct group when characterId changes", () => {
    const store = createTestStore();
    (useParams as jest.Mock).mockReturnValue({ characterId: "3" });

    render(
      <Provider store={store}>
        <List characters={mockCharacters} />
      </Provider>
    );

    expect(screen.getByText("Summer Smith")).toBeInTheDocument();
    expect(screen.queryByText("Rick Sanchez")).not.toBeInTheDocument();
    expect(screen.queryByText("Morty Smith")).not.toBeInTheDocument();
  });
});
