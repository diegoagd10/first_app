import uuid from 'uuid/v1';
import React, { PropTypes } from 'react';

import PostItem from './PostItem';

function PostList(props) {
	const { posts } = props;

	return (
		<section>
			{
				posts
					.map(post => <PostItem key={`${uuid()}-${post.id}`} {...post} />)
			}
		</section>
	);
}

PostList.propTypes = {
	posts: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.number,
			title: PropTypes.string,
			body: PropTypes.string,
			userId: PropTypes.number,
		}),
	).isRequired,
};

export default PostList;
