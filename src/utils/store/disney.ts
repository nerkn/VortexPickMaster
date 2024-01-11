import { create } from "zustand";
import {
  ApiResponse,
  DisneApiResponse,
  DisneyData,
  SearchResult,
} from "../types";

type CachedSearch = { [key: string]: SearchResult[] };

type UseRickAndMorty = {
  apiUrl: string;
  searches: string[];
  cachedChars: CachedSearch;
  search: (str: keyof CachedSearch) => Promise<SearchResult[]>;
};

export const useDisney = create<UseRickAndMorty>()((_set, get) => ({
  apiUrl: "https://api.disneyapi.dev/character",
  searches: [],
  cachedEpisodes: [],
  cachedChars: {
    "": [
      {
        id: 359,
        name: "King Augustus",
        image:
          "https://static.wikia.nocookie.net/disney/images/3/3c/KingAugustus.jpg",
        epiCount: 51,
      },
      {
        id: 308,
        name: "Queen Arianna",
        image:
          "https://static.wikia.nocookie.net/disney/images/1/15/Arianna_Tangled.jpg",
        epiCount: 51,
      },
      {
        id: 4703,
        name: "Mickey Mouse",
        image:
          "https://static.wikia.nocookie.net/disney/images/9/99/Mickey_Mouse_Disney_3.jpeg",
        epiCount: 482,
      },
    ],
  },
  search: async (str: keyof CachedSearch) => {
    let state = get();
    if (str in state.cachedChars) return state.cachedChars[str];
    let returnedSearches = (await fetch(state.apiUrl + "?name=" + str).then(
      (r) => r.json().catch(() => ({ info: { count: 0 }, results: [] }))
    )) as DisneApiResponse<DisneyData>;

    if (!returnedSearches.info) {
      state.cachedChars[str] = [];
    } else {
      let k = returnedSearches.data.map((char) => ({
        id: char._id,
        name: char.name,
        image: char.imageUrl,
        epiCount:
          char.films.length + char.shortFilms.length + char.tvShows.length,
      }));

      state.cachedChars[str] = k;
    }
    return state.cachedChars[str];
  },
}));
