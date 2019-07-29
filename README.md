# Autocomplete input

This project was bootstrapped by create-react-app so
`npm run start` for development start.

## Technical requirements:

**SearchInput**:
- Should have an input element with focused and active state.
- Should have a clear button, which will appear only when there is text in input.
- Should display a loading indicator when there is an ongoing search.
- Both input and clear button can be focused by pressing tab.
- When we clear the text using the clear button, focus should go back to the input element.
- Clicking clear button while a search should cancel the search.
- Clearing text manually or by clear button should close the PopupList and cancel any ongoing search.

**PopupList**:
- Should list the results in a popup list at the bottom of the search box.
- List items should highlight the matching parts of the text (see into).
- Should close on click outside or by ESC key.
- Should have a max height and the content should be scrollable.
- Selecting an item (by enter or click) should close the popup and update the input text

### Notes

I've decided to keep app organization simple.
For the project with this size it does work well, though in enterprise-level the approach should be different.

**TODOS**:
- Redux-form
- Test coverage
- Proper action creators for sagas
- Proper reusability of this component - css and store independent