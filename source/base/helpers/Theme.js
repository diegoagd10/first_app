import {
  teal500, cyan700,
  pinkA200,
  grey100, grey300, grey400, grey500,
  white, darkBlack, fullBlack,
} from 'material-ui/styles/colors';

import { fade } from 'material-ui/utils/colorManipulator';

import GetMuiTheme from 'material-ui/styles/getMuiTheme';

function Theme(userAgent) {
	return GetMuiTheme(
	{
		palette: {
		    primary1Color: teal500,
		    primary2Color: cyan700,
		    primary3Color: grey400,
		    accent1Color: pinkA200,
		    accent2Color: grey100,
		    accent3Color: grey500,
		    textColor: darkBlack,
		    alternateTextColor: white,
		    canvasColor: white,
		    borderColor: grey300,
		    disabledColor: fade(darkBlack, 0.3),
		    pickerHeaderColor: teal500,
		    clockCircleColor: fade(darkBlack, 0.07),
		    shadowColor: fullBlack,
  		},
	},
	{
		avatar: {
			borderColor: null,
		},
		userAgent,
	});
}

export default Theme;
