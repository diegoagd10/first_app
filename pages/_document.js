import React, { PropTypes } from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

class DocumentMain extends Document {

	static async getInitialProps(context) {
		const props = await super.getInitialProps(context);
		const request = context.req || context.xhr;

		let locale = 'es';

		if (context.isServer) {
			locale = request.headers['accept-language'].indexOf('es') >= 0 ? 'es' : 'en';
		} else {
			locale = navigator.languages.indexOf('es') > 0 ? 'es' : 'en';
		}

		return {
			locale,
			...props,
		};
	}

	render() {
		return (
 			<html lang={this.props.locale}>
		 		<Head>
			 		<meta charSet="utf-8" />
						<title>App</title>
						<meta
							name="viewport"
							content="width=device-width, initial-scale=1.0, minimum-scale=1.0"
						/>
						<link
							rel="stylesheet"
							href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.css"
						/>
						<link
							rel="stylesheet"
							href="https://fonts.googleapis.com/css?family=Roboto"
						/>
		 		</Head>
		 		<body className="custom_class">
			 		<Main />
			 		<NextScript />
		 		</body>
	 		</html>
		);
	}
}

DocumentMain.propTypes = {
	locale: PropTypes.string.isRequired,
};

export default DocumentMain;
