import { render, screen, fireEvent } from "@testing-library/react";
import SearchCharacter from "./search-character";
import {
  useParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { Character } from "../../types/characters.types";

jest.mock("next/navigation", () => ({
  useParams: jest.fn(),
  usePathname: jest.fn(),
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock("@/config/hooks/debounce.hook", () => ({
  useDebounce: jest.fn((value) => value),
}));

describe("SearchCharacter", () => {
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
    ],
  ];

  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useParams as jest.Mock).mockReturnValue({ characterId: "1" });
    (usePathname as jest.Mock).mockReturnValue("/characters");
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
  });

  it("should render the search input with placeholder", () => {
    render(<SearchCharacter />);

    const input = screen.getByPlaceholderText("Find your character...");
    expect(input).toBeInTheDocument();
  });

  it("should render search and user icons", () => {
    render(<SearchCharacter />);

    const searchIcon = screen.getByTestId("search-icon");
    const userIcon = screen.getByTestId("user-icon");
    expect(searchIcon).toBeInTheDocument();
    expect(userIcon).toBeInTheDocument();
  });

  it("should update search value when typing", () => {
    render(<SearchCharacter />);

    const input = screen.getByPlaceholderText("Find your character...");
    fireEvent.change(input, { target: { value: "Rick" } });

    expect(input).toHaveValue("Rick");
  });

  it("should update URL when search value changes", () => {
    render(<SearchCharacter />);

    const input = screen.getByPlaceholderText("Find your character...");
    fireEvent.change(input, { target: { value: "Rick" } });

    expect(mockRouter.push).toHaveBeenCalledWith("/characters?s=Rick");
  });

  it("should navigate to character when there is only one result", () => {
    (useParams as jest.Mock).mockReturnValue({ characterId: "2" });
    render(<SearchCharacter characters={mockCharacters} />);

    expect(mockRouter.push).toHaveBeenCalledWith("/characters/1?s=");
  });

  it("should not navigate when there are multiple results", () => {
    const multipleCharacters = [
      ...mockCharacters,
      [
        {
          id: 2,
          name: "Morty Smith",
          status: "Alive" as const,
          species: "Human",
          type: "",
          gender: "Male",
          origin: { name: "Earth", url: "" },
          location: { name: "Earth", url: "" },
          image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
          episode: [],
        },
      ],
    ];

    render(<SearchCharacter characters={multipleCharacters} />);

    expect(mockRouter.push).not.toHaveBeenCalledWith(
      expect.stringContaining("/characters/")
    );
  });

  it("should apply custom className when provided", () => {
    const customClass = "custom-class";
    render(<SearchCharacter className={customClass} />);

    const container = screen.getByTestId("search-character");
    expect(container).toHaveClass(customClass);
  });

  it("should initialize with search value from URL", () => {
    const searchParams = new URLSearchParams();
    searchParams.set("s", "initial");
    (useSearchParams as jest.Mock).mockReturnValue(searchParams);

    render(<SearchCharacter />);

    const input = screen.getByPlaceholderText("Find your character...");
    expect(input).toHaveValue("initial");
  });
});
