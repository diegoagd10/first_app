import Avatar from 'material-ui/Avatar';
import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import { grey100 } from 'material-ui/styles/colors';

import Container from '../../shared/components/Container';

function Styles() {
	return (
		<style>
		{`
			.UserHeader {
				padding: 10px 0;
				background: ${grey100};
				font-family: Roboto, sans-serif;
			}
			.UserHeader.Container {
				display: flex;
			}
			.UserHeader.Title {
				font-size: 1.5em;	
			}
			.UserHeader.Title span {
				margin-left: 0.5em;
			}
	    `}
	    </style>
    );
}


function UserHeader(props) {
	const {
		name,
	} = props;

	return (
		<header className="UserHeader">
			<Container>
				<section className="UserHeader Container">
					<Avatar
						size={80}
						src="http://betterpropertiesauburn.com/wp-content/uploads/2015/11/ad516503a11cd5ca435acc9bb6523536-1.png"
					/>
					<h1 className="UserHeader Title">
						<FormattedMessage
							id="title.profile"
							values={{
								name,
							}}
						/>
					</h1>
				</section>
			</Container>
			<Styles />
		</header>
	);
}

UserHeader.propTypes = {
	name: PropTypes.string.isRequired,
};

export default UserHeader;
