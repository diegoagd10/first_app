import Link from 'next/link';
import Image from 'react-lazy-image';
import React, { PropTypes } from 'react';
import Divider from 'material-ui/Divider';

function Styles() {
	return (
		<style>
		{`
			.PostItem {
				color: #333;
			}
			.PostItem.Link {
				text-decoration: none;
			}
			.PostItem.Container {
				margin: 0;
				display: flex;
			}
			.PostItem.Image {
				margin: 1em 0 1em 1em;
			}
			.PostItem.Content {
				padding-left: 1em;
			}
			.PostItem:hover {
				background: #e6e6e6;
			}
			
			@media only screen and (max-width: 575px) {
			    .PostItem.Container {
					margin: 0;
					display: inline;
				}
				.PostItem.Image {
					margin: 1em 0;
					width: 100%;
				}
			}
		`}
	    </style>
    );
}

function PostItem(props) {
	const {
		id,
		title,
		body,
	} = props;

	return (
		<article className="PostItem">
			<Link href={`/post?id=${id}`}>
				<a className="PostItem Link">
					<section className="PostItem Container">
						<div>
							<Image
								width={150}
								height={150}
								className="PostItem Image"
								source="https://unsplash.it/1000"
							/>
						</div>
						<div className="PostItem Content">
							<h2>
								{title}
							</h2>
							<p>{body}</p>
						</div>
					</section>
				</a>
			</Link>
			<Divider />
			<Styles />
		</article>
	);
}

PostItem.propTypes = {
	id: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
	body: PropTypes.string.isRequired,
};

export default PostItem;
