import React from 'react';
import { FormattedMessage } from 'react-intl';
import CircularProgress from 'material-ui/CircularProgress';

function Styles() {
	return (
		<style>
		{`
			.Loading {
				text-align: center;
			}
		`}
	    </style>
    );
}

function Loading() {
	return (
		<div className="Loading">
			<h2>
				<FormattedMessage id="loading" />
			</h2>
			<CircularProgress size={80} thickness={5} />
			<Styles />
		</div>
	);
}

export default Loading;
