import React, { PropTypes } from 'react';

function Styles() {
	return (
		<style>
		{`
			.Container {
				margin: auto 20%;
			}
			
			@media only screen and (max-width: 992px) {
			    .Container {
					margin: auto 15%;
				}
			}

			@media only screen and (max-width: 768px) {
			    .Container {
					margin: auto 10%;
				}
			}

			@media only screen and (max-width: 575px) {
			    .Container {
					margin: auto 5%;
				}
			}
	    `}
	    </style>
    );
}

function Container(props) {
	const children = props.children;

	return (
		<div className="Container">
			{children}
			<Styles />
		</div>
	);
}

Container.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element,
		PropTypes.arrayOf(PropTypes.element),
	]).isRequired,
};

export default Container;
