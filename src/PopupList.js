import React, { PureComponent } from 'react';
import { connect } from "react-redux";
import { inputChange } from "./actions";
import PopupListView from "./PopupListView";


class PopupList extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.isFetching);
    
    if (!this.props.searchInputValue) {
      return null
    }

    return (
      <PopupListView
        planetList={this.props.autocompletePlanets}
        inputValue = {this.props.searchInputValue}
        isFetching = {this.props.isFetching} />
      )
  }
}

const mapStateToProps = (state /*, ownProps*/ ) => {
  return {
    autocompletePlanets: state.autocompletePlanets,
    searchInputValue: state.searchInputValue,
    isFetching: state.isFetching,
  }
}

const mapDispatchToProps = { inputChange };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PopupList);