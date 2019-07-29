import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { inputChange, popupOutsideClick, setAutocompleteOption } from '../utils/actions';
import PopupListView from './PopupListView';
import ClickOutsideHandler from './hocs/clickOutsideHandler';

class PopupList extends PureComponent {
  constructor(props) {
    super(props);
    this.ESCAPE_KEY_CODE = 27;
  }

  static propTypes = {
    searchInputValue: PropTypes.string,
    isFetching: PropTypes.bool,
    autocompletePlanets: PropTypes.array,
    isOpen: PropTypes.bool,
    inputRef: PropTypes.shape({
      bottom: PropTypes.number,
      left: PropTypes.number,
      width: PropTypes.number,
    })
  }

  setInputText = (text) => {
    this.props.setAutocompleteOption(text);
  }

  calculatePosition() {
    let styleObj = {
      top: `${this.props.inputRef.bottom}px`,
      left: `${this.props.inputRef.left}px`
    }
    return styleObj
  }

  render() {

    if (!this.props.isOpen || !this.props.searchInputValue) {
      return null
    }

    let calculatePosition = () => {
      let styleObj = {
        top: `${this.props.inputRef.bottom}px`,
        left: `${this.props.inputRef.left}px`,
        width: `${this.props.inputRef.width}px`,
      }
      return styleObj
    }

    return (
      <ClickOutsideHandler
        className='listContainer'
        style={calculatePosition()}
        outsideClickLogic={this.props.popupOutsideClick}
        keyCodes={[this.ESCAPE_KEY_CODE]}>
        <PopupListView
          planetList={this.props.autocompletePlanets}
          clickHandler={this.props.setAutocompleteOption}
          inputValue = {this.props.searchInputValue}
          isFetching = {this.props.isFetching}
          isOpen= {this.props.isOpen} />
      </ClickOutsideHandler>
      )
  }
}

const mapStateToProps = (state /*, ownProps*/ ) => {
  return {
    autocompletePlanets: state.autocompletePlanets,
    searchInputValue: state.searchInputValue,
    isFetching: state.isFetching,
    isOpen: state.isAutocompleteListOpen,
    inputRef: state.inputRef,
  }
}

const mapDispatchToProps = { inputChange, popupOutsideClick, setAutocompleteOption };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PopupList);