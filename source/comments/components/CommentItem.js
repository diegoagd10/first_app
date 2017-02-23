import Avatar from 'material-ui/Avatar';
import React, { PropTypes } from 'react';
import Divider from 'material-ui/Divider';
import { FormattedHTMLMessage } from 'react-intl';
import { blueA400 } from 'material-ui/styles/colors';

function Styles() {
	return (
		<style>
		{`
			.CommentItem {
				margin-top: 1em;
				color: #333;
			}
			.CommentItem.Header {
				display: flex;
			}
			.CommentItem.Header span {
				padding-top: 0.5em;
				margin-left: 0.5em;								
			}
			.CommentItem.Header a {
				color: ${blueA400};
				text-decoration: none;
				margin-left: 0.5em;
			}
			.CommentItem.Container {
				margin: 0;
				display: flex;
			}
		`}
	    </style>
    );
}

function CommentItem(props) {
	const {
		name,
		email,
		body,
	} = props;

	return (
		<article className="CommentItem">
			<header className="CommentItem Header">
				<Avatar
					src="http://betterpropertiesauburn.com/wp-content/uploads/2015/11/ad516503a11cd5ca435acc9bb6523536-1.png"
				/>
				<FormattedHTMLMessage
					id="comment.meta.author"
					values={{
						email,
						name,
					}}
				/>
			</header>
			<section className="CommentItem Container">
				<p>{body}</p>
			</section>
			<Divider />
			<Styles />
		</article>
	);
}

CommentItem.propTypes = {
	name: PropTypes.string,
	email: PropTypes.string,
	body: PropTypes.string,
};

export default CommentItem;
