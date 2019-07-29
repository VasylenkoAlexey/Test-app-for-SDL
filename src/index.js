import React from 'react';
import ReactDOM from 'react-dom';
import store from "./utils/store";
import "./App.scss";
import SearchBox from './components/SearchBox.js';
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={store}>
		<SearchBox />
  </Provider>, document.getElementById('root')
);