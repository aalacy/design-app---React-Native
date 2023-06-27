import React from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '../const/colors';


export default class Bottom extends React.Component {
	render() {
		return (
			<View style={{ 
				height: 3,
				width: 134,
				backgroundColor: colors.grayColor,
				marginBottom: 8,
				}}>
			</View>
		)
	}
}
