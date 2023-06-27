import React from 'react';
import { Image, View } from 'react-native';

const CircleLoading = () => {
	return(
		<View style={{	justifyContent: 'center', alignItems: 'center' }}>
			<Image
				source={require('../../assets/icons/loading.gif')}
				width={40}
				heigh={40}
			/>
		</View>
	)
}

export default CircleLoading;