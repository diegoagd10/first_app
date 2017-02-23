import apiClient from './apiClient';

function setPosts(posts) {
	return {
		type: 'SET_POSTS',
		payload: posts,
	};
}

function setPost(post) {
	return {
		type: 'SET_POST',
		payload: post,
	};
}

function setComments(comments) {
	return {
		type: 'SET_COMMENTS',
		payload: comments,
	};
}

function setUser(user) {
	return {
		type: 'SET_USER',
		payload: user,
	};
}

function setUserPosts(posts) {
	return {
		type: 'SET_USER_POSTS',
		payload: posts,
	};
}


function postsNextPage() {
	return async (dispatch, getState) => {
		const state = getState();

		const currentPage = state.get('posts').get('page');

		const posts = await apiClient.getList(currentPage);

		dispatch(
			setPosts(posts),
		);

		return posts;
	};
}

function loadPost(id) {
	return async (dispatch) => {
		const post = await apiClient.getSingle(id);

		dispatch(
			setPost(post),
		);

		return post;
	};
}

function loadCommentsByPost(postId) {
	return async (dispatch) => {
		const comments = await apiClient.getComments(postId);

		dispatch(
			setComments(comments),
		);

		return comments;
	};
}

function loadUser(userId) {
	return async (dispatch) => {
		const user = await apiClient.getUser(userId);

		dispatch(
			setUser(user),
		);

		return user;
	};
}

function loadUserPosts(userId) {
	return async (dispatch, getState) => {
		const state = getState();
		let posts = state.get('posts').get('entities')
			.filter(p => p.userId === userId)
			.toList()
			.toJS();

		if (!posts || posts.lenght === 0) {
			posts = await apiClient.getPostsByUser(userId);

			dispatch(
				setUserPosts(posts),
			);
		}

		return posts;
	};
}

export default {
	setPosts,
	setUser,
	setComments,
	setUserPosts,
	loadPost,
	loadUser,
	postsNextPage,
	loadUserPosts,
	loadCommentsByPost,
};
