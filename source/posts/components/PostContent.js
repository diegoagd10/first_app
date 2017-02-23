import Image from 'react-lazy-image';
import React, { PropTypes } from 'react';
import { grey600 } from 'material-ui/styles/colors';

function Styles() {
	return (
		<style>
		{`
			.PostContent {
				color: #333;
				text-decoration: none;
			}
			.PostContent.Image {
				margin: 1em 0 1em 1em;
			}
			.PostContent.Title {

			}
			.PostContent.Body {
				color: ${grey600};
			}
		`}
	    </style>
    );
}

function PostContent(props) {
	const {
		body,
	} = props;

	return (
		<section className="PostContent">
			<Image
				alt=""
				style={{
					width: '100%',
					height: '100%',
				}}
				source="https://unsplash.it/1000"
			/>
			<p>{body}</p>
			<Styles />
		</section>
	);
}

PostContent.propTypes = {
	body: PropTypes.string.isRequired,
};

export default PostContent;
