import { Seq as seq, Map as map } from 'immutable';
import { combineReducers } from 'redux-immutable';

import initialState from './initialState';

function postsPageReducer(state = initialState.get('posts').get('page'), action = {}) {
	switch (action.type) {
		case 'SET_POSTS':
			return state + 1;

		default:
			return state;
	}
}

function postsEntitiesReducer(state = initialState.get('posts').get('entities'), action = {}) {
	switch (action.type) {
		case 'SET_POSTS':
		case 'SET_USER_POSTS':
			return action.payload
				.reduce(
					(posts, post) => posts.set(post.id, map(post)),
					state,
				);

		default:
			return state;
	}
}

const postsReducer = combineReducers({
	page: postsPageReducer,
	entities: postsEntitiesReducer,
});

function currentPostReducer(state = initialState.get('currentPost'), action = {}) {
	switch (action.type) {
		case 'SET_POST':
			return state.set(action.payload.id.toString(), map(action.payload));

		default:
			return state;
	}
}

function commentsReducer(state = initialState.get('comments'), action = {}) {
	switch (action.type) {
		case 'SET_COMMENTS':
			return action.payload
				.reduce(
					(comments, comment) => comments.set(comment.id.toString(), map(comment)),
					state,
				);

		default:
			return state;
	}
}

function usersReducer(state = initialState.get('users'), action = {}) {
	switch (action.type) {
		case 'SET_USER':
			return state.set(action.payload.id.toString(), map(action.payload));

		default:
			return state;
	}
}

const reducer = combineReducers({
	posts: postsReducer,
	currentPost: currentPostReducer,
	comments: commentsReducer,
	user: usersReducer,
});

export default reducer;
