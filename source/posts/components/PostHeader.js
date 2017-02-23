import Link from 'next/link';
import Avatar from 'material-ui/Avatar';
import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import { blueA400, grey100 } from 'material-ui/styles/colors';
import CircularProgress from 'material-ui/CircularProgress';

import Container from '../../shared/components/Container';

function Styles() {
	return (
		<style>
		{`
			.PostHeader {
				color: #333;
				padding: 10px 0;
				background: ${grey100};				
			}
			.PostHeader.Title {
				font-size: 1.5em;	
			}
			.PostHeader.Avatar {
				display: flex;
			}
			.PostHeader.Avatar.Link {
				font-size: 20px;
				color: ${blueA400};
				text-decoration: none;
				margin-left: 0.5em;
			}
	    `}
	    </style>
    );
}

function PostHeader(props) {
	const {
		post,
		user,
		loading,
	} = props;

	return (
		<header className="PostHeader">
			<Container>
				<h1 className="PostHeader Title">
					<FormattedMessage
						id="title.post"
						values={{
							postTitle: post.title,
						}}
					/>
				</h1>
				<section className="PostHeader Avatar">
					<Avatar
						src="http://betterpropertiesauburn.com/wp-content/uploads/2015/11/ad516503a11cd5ca435acc9bb6523536-1.png"
					/>
					{
						loading ? <CircularProgress style={{ marginLeft: 20 }} /> : (
							<Link href={`/user?id=${post.userId}`}>
								<a className="PostHeader Avatar Link">{user.name}</a>
							</Link>
						)
					}
				</section>
			</Container>
			<Styles />
		</header>
	);
}

PostHeader.propTypes = {
	loading: PropTypes.bool,
	user: PropTypes.shape({
		id: PropTypes.number,
		name: PropTypes.string,
	}).isRequired,
	post: PropTypes.shape({
		userId: PropTypes.number,
		id: PropTypes.number,
		title: PropTypes.string,
		body: PropTypes.string,
	}).isRequired,
};

PostHeader.defaultProps = {
	loading: true,
};

export default PostHeader;
