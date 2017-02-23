import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';

import LabelValue from '../../shared/components/LabelValue';

function Styles() {
	return (
		<style >
		{`
			.UserDetails {
				display: flex;
				flex-direction: column;
				margin-bottom: 1em;
			}
	    `}
	    </style>
    );
}

function UserDetails(props) {
	const {
		username,
		email,
		phone,
		website } = props;

	return (
		<section className="UserDetails">
			<h2>
				<FormattedMessage id="profile.field.basic" />
			</h2>
			<LabelValue
				label={<FormattedMessage id="profile.field.basic.username" />}
				value={username}
			/>
			<LabelValue
				label={<FormattedMessage id="profile.field.basic.email" />}
				value={
					<a href="mailti:{email}" target="_blank" rel="noopener noreferrer">{email}</a>
				}
			/>
			<LabelValue
				label={<FormattedMessage id="profile.field.basic.phone" />}
				value={phone}
			/>
			<LabelValue
				label={<FormattedMessage id="profile.field.basic.website" />}
				value={
					<a href={`http://${website}`} target="_blank" rel="noopener noreferrer">{website}</a>
				}
			/>
			<Styles />
		</section>
	);
}

UserDetails.propTypes = {
	username: PropTypes.string.isRequired,
	email: PropTypes.string.isRequired,
	phone: PropTypes.string.isRequired,
	website: PropTypes.string.isRequired,
};

export default UserDetails;
