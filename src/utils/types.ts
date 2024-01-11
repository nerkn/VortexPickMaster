export type Character = {
  id: number;
  name: string;
  status: "Alive" | "Dead" | "unknown";
  species: string;
  type: string;
  gender: "Female" | "Male" | "Genderless" | "unknown";
  image: string;
  episode: string[];
};
export type CharacterApiResponse = Character & {
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };

  url: string;
  created: string;
};
export type Episode = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
};
export type ApiResponse<T> = {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: T[];
};

export type SearchResult = {
  id: number;
  name: string;
  image: string;
  epiCount: number;
};

export type FormEvent = React.FormEvent<HTMLInputElement> & {
  target: HTMLInputElement;
};
export type FetchCb = (str: string) => Promise<SearchResult[]>;
