export const inputChange = searchInputValue => ({
  type: 'INPUT_CHANGE',
  searchInputValue
})

export const inputClear = () => ({
  type: 'INPUT_CLEARED',
})

export const popupOutsideClick = () => ({
  type: 'POPUP_OUTSIDE_CLICKED',
})

export const pushAutocompleteRef = (ref) => ({
  type: 'INPUT_REF_CREATED',
  ref
})