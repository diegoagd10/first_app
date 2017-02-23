import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';

import CommentItem from './CommentItem';

function CommentsList(props) {
	const { comments } = props;

	return (
		<section>
			<h3>
				<FormattedMessage
					id="post.meta.comments"
					values={{
						amount: comments.length,
					}}
				/>
			</h3>
			{
				comments
					.map(comment => <CommentItem key={comment.id} {...comment} />)
			}
		</section>
	);
}

CommentsList.propTypes = {
	comments: PropTypes.arrayOf(
		PropTypes.shape({
			postId: PropTypes.number,
			id: PropTypes.number,
		    name: PropTypes.string,
		    email: PropTypes.string,
		    body: PropTypes.string,
		}),
	).isRequired,
};

export default CommentsList;
