import { create } from "zustand";
import { ApiResponse, CharacterApiResponse, SearchResult } from "../types";

type CachedSearch = { [key: string]: SearchResult[] };

type UseRickAndMorty = {
  apiUrl: string;
  searches: string[];
  cachedChars: CachedSearch;
  search: (str: keyof CachedSearch) => Promise<SearchResult[]>;
};

export const useRickAndMorty = create<UseRickAndMorty>()((_set, get) => ({
  apiUrl: "",
  searches: [],
  cachedEpisodes: [],
  cachedChars: { "": [] },
  search: async (str: keyof CachedSearch) => {
    let state = get();
    if (str in state.cachedChars) return state.cachedChars[str];
    let returnedSearches = (await fetch(state.apiUrl + "?name=" + str).then(
      (r) => r.json().catch(() => ({ info: { count: 0 }, results: [] }))
    )) as ApiResponse<CharacterApiResponse>;

    if (!returnedSearches.info) {
      state.cachedChars[str] = [];
    } else {
      let k = returnedSearches.results.map((char) => ({
        id: char.id,
        name: char.name,
        image: char.image,
        epiCount: char.episode.length,
      }));

      state.cachedChars[str] = k;
    }
    return state.cachedChars[str];
  },
}));
