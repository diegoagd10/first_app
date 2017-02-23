import React, { PropTypes } from 'react';
import { Row, Col } from 'react-grid-system';

function Styles() {
	return (
		<style >
		{`
			.LabelValue {
				margin-top: 0.5em;
			}
	    `}
	    </style>
    );
}

function LabelValue(props) {
	const { label, value } = props;

	return (
		<Row className="LabelValue">
			<Col md={6}>
				<strong>
					{label}
				</strong>
			</Col>
			<Col md={6}>
				<span className="LabelValue Item">
					{value}
				</span>
			</Col>
			<Styles />
		</Row>
	);
}

LabelValue.propTypes = {
	label: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element,
		PropTypes.arrayOf(PropTypes.element),
	]).isRequired,
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.element,
		PropTypes.arrayOf(PropTypes.element),
	]).isRequired,
};

export default LabelValue;
