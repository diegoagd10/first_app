import { fromJS } from 'immutable';

const initialState = fromJS({
	posts: {
		page: 1,
		entities: {},
	},
	currentPost: {},
	comments: {},
	user: {},
});

export default initialState;
