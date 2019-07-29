import React from 'react';

function PopupListView(props) {

  let highlightResults = (word, searchQuery) => {
    // We assume that search should be case insensitive
    let searchIndex = word.toLowerCase().indexOf(searchQuery.toLowerCase());
    let wordParts = {
      first: word.slice(0, searchIndex),
      second: word.slice(searchIndex, searchIndex + searchQuery.length),
      third: word.slice(searchIndex + searchQuery.length, )
    }

    return (
      <React.Fragment>
        <span>{wordParts.first}</span>
        <b>{wordParts.second}</b>
        <span>{wordParts.third}</span>
      </React.Fragment>
    )
  }

  const SWAPI_MAGIC_NUMBER = 29;

    // Silly error handling, just placeholder for future
  if (props.planetList[0] === 'Error') {
    return <ul><li>Something went wrong</li></ul>

  }
   else if (props.isFetching) {
      return null

  } else if (props.planetList.length === 0) {
      return (<ul><li>No results</li></ul>)
  }

  return (
      <ul className='popupList'>{props.planetList.map(item => 
          // This is dirty way to get index of a planet in swapi DB, since that's the only place
          // where they send it. But we still can use it and create a url for certain planet for future. 
          <li key={item.url.slice(SWAPI_MAGIC_NUMBER,-1)}
              onClick={()=> props.clickHandler(item.name)}>
              {highlightResults(item.name, props.inputValue)}
          </li>
        )}
      </ul>
  )
}

export default PopupListView