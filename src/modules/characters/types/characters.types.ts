export type Character = {
  id: number;
  name: string;
  status: "Alive" | "Dead";
  species: string;
  type: string;
  gender: string;
  origin: CharacterOrigin;
  location: CharacterOrigin;
  image: string;
  episode: string[];
};

export type CharacterOrigin = {
  name: string;
  url: string;
};

