import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';

import LabelValue from '../../shared/components/LabelValue';

function Styles() {
	return (
		<style >
		{`
			.UserAddress {
				display: flex;
				flex-direction: column;
				margin-bottom: 1em;
			}
	    `}
	    </style>
    );
}

function UserAddress(props) {
	const {
		street,
		suite,
		city,
		zipcode } = props;

	return (
		<section className="UserAddress">
			<h2>
				<FormattedMessage id="profile.field.address" />
			</h2>
			<address>
				<LabelValue
					label={<FormattedMessage id="profile.field.address.street" />}
					value={street}
				/>
				<LabelValue
					label={<FormattedMessage id="profile.field.address.suite" />}
					value={suite}
				/>
				<LabelValue
					label={<FormattedMessage id="profile.field.address.city" />}
					value={city}
				/>
				<LabelValue
					label={<FormattedMessage id="profile.field.address.zipcode" />}
					value={zipcode}
				/>
			</address>
			<Styles />
		</section>
	);
}

UserAddress.propTypes = {
	street: PropTypes.string.isRequired,
	suite: PropTypes.string.isRequired,
	city: PropTypes.string.isRequired,
	zipcode: PropTypes.string.isRequired,
};

export default UserAddress;
