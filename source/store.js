import thunk from 'redux-thunk';
import { fromJS } from 'immutable';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from './reducer';
import initialState from './initialState';


const makeStore = (state = initialState) => {
	return createStore(reducer, fromJS(state), composeWithDevTools(
		applyMiddleware(
			thunk),
		),
	);
};

export default makeStore;
