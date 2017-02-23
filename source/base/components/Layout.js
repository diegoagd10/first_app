import Link from 'next/link';
import Head from 'next/head';
import { AppBar } from 'material-ui';
import React, { PropTypes } from 'react';
import { white } from 'material-ui/styles/colors';
import { injectIntl, FormattedMessage } from 'react-intl';

function Styles() {
	return (
		<style>
		{`
			.Layout.Home.Title {
				color: ${white};
				text-decoration: none;
			}
	    `}
	    </style>
    );
}

function Layout(props) {
	const {
		intl,
		children,
		intlTitleId,
		intlTitleValues,
	} = props;

	return (
		<main>
			<Head>
				<title>{ intl.formatMessage({ id: intlTitleId }, intlTitleValues) }</title>
			</Head>
			<AppBar
				iconStyleLeft={{
					display: 'none',
				}}
				title={
					<Link href="/">
						<a className="Layout Home Title">
							<FormattedMessage id="title" />
						</a>
					</Link>
				}
			/>
			<div>
				{children}
			</div>
			<Styles />
		</main>
	);
}

Layout.propTypes = {
	intl: PropTypes.shape().isRequired,
	intlTitleId: PropTypes.string.isRequired,
	intlTitleValues: PropTypes.objectOf(PropTypes.shape),
	children: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element,
		PropTypes.arrayOf(PropTypes.element),
	]).isRequired,
};

Layout.defaultProps = {
	intlTitleValues: {},
};

export default injectIntl(Layout);
