import React, { PropTypes } from 'react';
import { FormattedMessage } from 'react-intl';
import RaisedButton from 'material-ui/RaisedButton';
import ActionHome from 'material-ui/svg-icons/action/home';
import { teal500, white } from 'material-ui/styles/colors';

import Layout from '../source/base/components/Layout';
import BasePage from '../source/base/components/BasePage';

function Styles() {
	return (
		<style>
		{`
			.PageNotFound {
				position: absolute;
				font-family: Roboto, sans-serif;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				background: ${teal500};
			}

			.PageNotFound.Inner {
				position: absolute;
				top: 25%;				
			}

			.PageNotFound.Container {
				position: static;
				color: ${white};
				text-align: center;
			}

			.PageNotFound.Title {
				position: static;
				font-size: 100px;
			}

			.PageNotFound.Link {
				position: static;
				background: transparent;
				text-decoration: none;
			}
	    `}
	    </style>
    );
}

class Error extends React.Component {

	static async getInitialProps({ pathname }) {
		return {
			page: pathname,
		};
	}

	render() {
		const { page } = this.props;

		return (
			<Layout {...this.props} intlTitleId="error.404" intlTitleValues={{ page }}>
				<main className="PageNotFound">
					<div className="PageNotFound Inner">
						<div className="PageNotFound Container">
							<span className="PageNotFound Title">404</span>
							<h2>
								<FormattedMessage
									id="error.404"
									values={{ page }}
								/>
							</h2>
							<RaisedButton
								href="/"
								label={ <FormattedMessage id="error.404.link" /> }
								icon={ <ActionHome /> }
							/>														
						</div>
					</div>
					<Styles />
				</main>
			</Layout>
		);
	}

}

Error.propTypes = {
	page: PropTypes.string.isRequired,
};

export default BasePage(null, null)(Error);
