import React from 'react';

 class PopupListView extends React.PureComponent {

  highlightResults = (word, searchQuery) => {
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

  render() {
    const SWAPI_MAGIC_NUMBER = 29;

    if (this.props.isFetching) {
      return (<p>Loading..</p>)
    }

    return (
      <ul className="PopupList">{this.props.planetList.map(item => 
          // This is dirty way to get index of a planet in swapi DB, since that's the only place
          // where they send it. But we still can use it and create a url for certain planet for future. 
          <li key={item.url.slice(SWAPI_MAGIC_NUMBER,-1)}>{this.highlightResults(item.name, this.props.inputValue)}</li>
        )}
      </ul>
    )
  }
}

export default PopupListView