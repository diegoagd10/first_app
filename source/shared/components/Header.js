import React, { PropTypes } from 'react';
import { grey100 } from 'material-ui/styles/colors';

import Container from './Container';

function Styles() {
	return (
		<style>
		{`
			.Header {
				color: #333;
				padding: 10px 0;
				background: ${grey100};
			}
			.Header.Title {
				font-size: 1.5em;	
			}
	    `}
	    </style>
    );
}

function Header(props) {
	const children = props.children;

	return (
		<header className="Header">
			<Container>
				<h1 className="Header Title">{children}</h1>
			</Container>
			<Styles />
		</header>
	);
}

Header.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element,
		PropTypes.arrayOf(PropTypes.element),
	]).isRequired,
};

export default Header;
