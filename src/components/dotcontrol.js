import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements'
import colors from '../const/colors';

export default class DotControl extends React.Component {
	render() {
		const { color, type } = this.props;
		const longControl = {
      		backgroundColor: color,
			width: 30,
			height: 11,
			marginRight: 5,
			borderRadius: 5,
		}

		const dotControl = {
			backgroundColor: color,
			width: 11,
			height: 11,
			marginRight: 5,
			borderRadius: 5,
		}

	    return (
	        <TouchableOpacity
	          onPress={this.props.onPress}
	          style={type == "long" ? longControl : dotControl}
          	/>
	    )
	}
}
