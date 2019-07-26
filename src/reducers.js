//import { combineReducers } from "redux";
import update from 'immutability-helper';

export const initialState = {
  autocompletePlanets: [],
  searchInputValue: '',
  isFetching: false
};

export function SearchBoxComponent(state = initialState, action) {
  switch (action.type) {
    case 'ALL_PLANETS_FETCHED':
      return Object.assign({}, state, {
        isFetching: false,

      })

    case 'INPUT_CHANGED':
      return Object.assign({}, state, {
        searchInputValue: action.searchInputValue,
        isFetching: true,
        autocompletePlanets: []

      })

    case 'PLANETS_PAGE_FETCHED':
      return Object.assign({}, state, {
        autocompletePlanets: update(state.autocompletePlanets, {$push: action.autocompletePlanets})
      })
    
    default: 
      return state
  }
}

