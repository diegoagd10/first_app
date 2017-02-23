import { bindActionCreators } from 'redux';
import withRedux from 'next-redux-wrapper';
import en from 'react-intl/locale-data/en';
import es from 'react-intl/locale-data/es';
import React, { Component, PropTypes } from 'react';
import Material from 'material-ui/styles/MuiThemeProvider';
import { IntlProvider, addLocaleData, injectIntl } from 'react-intl';

import appStore from '../../store';
import actions from '../../actions';
import Theme from '../helpers/Theme';
import applicationMessages from '../../messages.json';

import '../helpers/TabEvent';

// Register React Intl's locale data for the user's locale in the browser. This
// only happens once, on initial page load in the browser.
if (typeof window !== 'undefined') {
	addLocaleData([...en, ...es]);
}

function Styles() {
	return (
		<style>
		{`
			html, body {
				font-family: Roboto, sans-serif;
			}
		`}
	    </style>
    );
}

function BasePage(mapStateToProps, mapDispatchToProps) {
	return (Cmp) => {
		const IntlCmp = injectIntl(Cmp);

		class PageWithRedux extends Component {

			static async getInitialProps(context) {
				context.actions = bindActionCreators(actions, context.store.dispatch);

				const props = await Cmp.getInitialProps(context);

				let locale = 'es';
				let userAgent = null;

				const request = context.req || context.xhr;

				if (request) {
					userAgent = request.headers['user-agent'];
					locale = request.headers['accept-language'].indexOf('es') >= 0 ? 'es' : 'en';
				} else {
					userAgent = navigator.userAgent;
					locale = navigator.languages.indexOf('es') > 0 ? 'es' : 'en';
				}

				const now = Date.now();
				const messages = applicationMessages[locale];

				return {
					...props,
					now,
					locale,
					messages,
					userAgent,
				};
			}

			render() {
				const {
					now,
					locale,
					messages,
					userAgent,
					...props
				} = this.props;

				const theme = Theme(userAgent);

				return (
					<IntlProvider locale={locale} messages={messages} initialNow={now}>
						<Material muiTheme={theme}>
							<main>
								<IntlCmp {...props} />
								<Styles />
							</main>
						</Material>												
					</IntlProvider>
				);
			}
		}

		PageWithRedux.propTypes = {
			now: PropTypes.number.isRequired,
			locale: PropTypes.string.isRequired,
			userAgent: PropTypes.string.isRequired,
			messages: PropTypes.objectOf(PropTypes.string).isRequired,
		};

		return withRedux(appStore, mapStateToProps, mapDispatchToProps)(PageWithRedux);
	};
}

export default BasePage;
