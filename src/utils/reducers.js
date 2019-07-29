//import { combineReducers } from "redux";

export const initialState = {
  inputRef: {},
  autocompletePlanets: [],
  searchInputValue: '',
  isFetching: false,
  isAutocompleteListOpen: false
};

export function SearchBoxComponent(state = initialState, action) {
  switch (action.type) {

    case 'INPUT_CHANGED':
      return { ...state,
        searchInputValue: action.payload,
        isFetching: true,
        autocompletePlanets: [],
      }

    case 'INPUT_EMPTY':
      return { ...state,
        isFetching: false,
      }

    case 'INPUT_CLEARED':
      return { ...state,
        searchInputValue: '',
      }

    case 'POPUP_OUTSIDE_CLICKED':
      return { ...state,
        isAutocompleteListOpen: false,
      }

    case 'PLANETS_PAGE_FETCH_START':
      return { ...state,
        isAutocompleteListOpen: true,
      }

    case 'PLANETS_PAGE_FETCHED':
      return { ...state,
        autocompletePlanets: [...state.autocompletePlanets,  ...action.payload]
      }

    case 'ALL_PLANETS_FETCHED':
      return { ...state,
        isFetching: false,
        isAutocompleteListOpen: true
      }

    case 'PLANET_FETCH_ABORTED':
      return { ...state,
        isFetching: false,
        autocompletePlanets: [],
      }

    case 'PLANET_FETCH_ERRORED':
      return { ...state,
        isFetching: false,
        autocompletePlanets: ['Error'],
      }

    case 'INPUT_REF_CREATED':
      return { ...state,
        inputRef: action.payload,
      }

    case 'AUTOCOMPLETE_OPTION_CLICKED':
      return { ...state,
        searchInputValue: action.payload,
        autocompletePlanets: [],
        isAutocompleteListOpen: false,
      }
      
    default: 
      return state
  }
}

