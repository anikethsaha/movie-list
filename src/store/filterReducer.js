import React from "react";

export const initialVal = {
  sort: "popularity",
  lang: [],
  genre: []
};

export const filterContext = React.createContext(initialVal);

/**
 * Reducer for handling filters
 * @param {Object<string, string[]>} state
 * @param {Object<{type:string, payload: stirng}>} action
 */
export default function filterReducer(state = initialVal, action) {
  switch (action.type) {
    case "UPDATE_SORT": {
      return {
        ...state,
        sort: action.payload.sort
      };
    }
    case "UPDATE_LANG": {
      const langs = new Set(state.lang.concat(action.payload.lang));

      return {
        ...state,
        lang: Array.from(langs)
      };
    }
    case "DELETE_LANG": {
      const langs = state.lang;
      const idx = langs.indexOf(action.payload.lang);
      if (idx > -1) {
        langs.splice(idx, 1);
      }

      return {
        ...state,
        lang: langs
      };
    }
    case "UPDATE_GENRE": {
      const genres = new Set(state.genre.concat(action.payload.genre));

      return {
        ...state,
        genre: Array.from(genres)
      };
    }
    case "DELETE_GENRE": {
      const genres = state.genre;
      const idx = genres.indexOf(action.payload.genre);
      if (idx > -1) {
        genres.splice(idx, 1);
      }

      return {
        ...state,
        genre: genres
      };
    }
    default: {
      return state;
    }
  }
}
