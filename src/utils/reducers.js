//import { combineReducers } from "redux";
import update from 'immutability-helper';

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
      return Object.assign({}, state, {
        searchInputValue: action.searchInputValue,
        isFetching: true,
        autocompletePlanets: [],
      })

    case 'INPUT_EMPTY':
      return Object.assign({}, state, {
        isFetching: false,
      })

    case 'INPUT_CLEARED':
      return Object.assign({}, state, {
        searchInputValue: '',
      })

    case 'POPUP_OUTSIDE_CLICKED':
      return Object.assign({}, state, {
        isAutocompleteListOpen: false,
      })

    case 'PLANETS_PAGE_FETCH_START':
      return Object.assign({}, state, {
        isAutocompleteListOpen: true,
      })

    case 'PLANETS_PAGE_FETCHED':
      return Object.assign({}, state, {
        autocompletePlanets: update(state.autocompletePlanets, {$push: action.autocompletePlanets})
      })

    case 'ALL_PLANETS_FETCHED':
      return Object.assign({}, state, {
        isFetching: false,
        isAutocompleteListOpen: true
      })

    case 'PLANET_FETCH_ABORTED':
      return Object.assign({}, state, {
        isFetching: false,
        autocompletePlanets: [],
      })

    case 'PLANET_FETCH_ERRORED':
      return Object.assign({}, state, {
        isFetching: false,
        autocompletePlanets: ['Error'],
      })

    case 'INPUT_REF_CREATED':
      return Object.assign({}, state, {
        inputRef: action.ref,
      })

    case 'AUTOCOMPLETE_OPTION_CLICKED':
      return Object.assign({}, state, {
        searchInputValue: action.option,
        autocompletePlanets: [],
        isAutocompleteListOpen: false,


      })
    default: 
      return state
  }
}

