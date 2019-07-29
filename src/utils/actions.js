export const inputChange = payload => ({
  type: 'INPUT_CHANGE',
  payload
})

export const inputClear = () => ({
  type: 'INPUT_CLEARED',
})

export const popupOutsideClick = () => ({
  type: 'POPUP_OUTSIDE_CLICKED',
})

export const pushAutocompleteRef = (payload) => ({
  type: 'INPUT_REF_CREATED',
  payload
})

export const setAutocompleteOption = (payload) => ({
  type: 'AUTOCOMPLETE_OPTION_CLICKED',
  payload
})