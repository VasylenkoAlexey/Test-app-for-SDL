import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { inputChange, inputClear, pushAutocompleteRef } from '../utils/actions';

class SearchInput extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      active: true
    };
  }

  static propTypes = {
    searchInputValue: PropTypes.string,
    isFetching: PropTypes.bool,
  }

  componentDidMount() {
    this.inputRef.current.focus();
    this.props.pushAutocompleteRef(this.inputRef.current.getBoundingClientRect());
    window.a = this.inputRef.current;
  }

  handleInput = (event) => {
    event.target.value ? this.props.inputChange(event.target.value) : this.props.inputChange('');
  }

  handleClick = (event) => {
    this.props.inputClear();
    this.inputRef.current.focus();
  }

  render() {
    const INPUT_NAME = 'Star Wars Planets'
    const isTouched = this.state.active || this.props.searchInputValue;
    
    return (
      <div className={`field ${isTouched ? 'active' : ''}`}>
      
        <input ref={this.inputRef}
          type='text' 
          id='searchInput'
          value={this.props.searchInputValue}
          onChange={this.handleInput}
          onFocus={() => this.setState({ active: true })}
          onBlur={() => this.setState({ active: false })}
          placeholder={this.state.active ? '' : INPUT_NAME} />
        <label htmlFor='searchInput'>{INPUT_NAME}</label>
        {this.props.searchInputValue && <button onClick={this.handleClick} className='close'/>}
        {this.props.isFetching && <div className='spinner'></div>}

      </div>
    );
  }
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    searchInputValue: state.searchInputValue,
    isFetching: state.isFetching,
  }
}

const mapDispatchToProps = { inputChange, inputClear, pushAutocompleteRef };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchInput);
