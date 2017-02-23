import fetch from 'isomorphic-fetch';

const baseUrl = 'https://jsonplaceholder.typicode.com';

const apiClient = {

	getList: async (page = 1) => {
		const response = await fetch(`${baseUrl}/posts?_page=${page}`);
		const data = await response.json();

		return data;
	},

	getSingle: async (id = 1) => {
		const response = await fetch(`${baseUrl}/posts/${id}`);
		const data = await response.json();

		return data;
	},

	getComments: async (id = 1) => {
		const response = await fetch(`${baseUrl}/posts/${id}/comments`);
		const data = await response.json();

		return data;
	},

	getUser: async (id = 1) => {
		const response = await fetch(`${baseUrl}/users/${id}`);
		const data = await response.json();

		return data;
	},

	getPostsByUser: async (id = 1) => {
		const response = await fetch(`${baseUrl}/posts/?userId=${id}`);
		const data = await response.json();

		return data;
	},
};

export default apiClient;
