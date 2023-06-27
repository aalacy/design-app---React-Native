import React from 'react';
import { StyleSheet, Text, View, Alert, Dimensions, Keyboard, FlatList, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import { Button, Icon, Input, Header, Avatar, Card } from 'react-native-elements'

import { onSignOut } from '../../helpers';
import colors   from '../../const/colors';

const menuData = [
	'Settings',
	'Laundry Service',
	'Contact US',
	'Terms of Use',
	'Privacy & Policy',
	'LOGOUT',
];

export default class Menu extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			avatar: '',
			first_name: '',
			last_name: '',
		};
	}

	async componentDidMount() {
	    storage.load({ key: 'user' }).then(ret => {
			const { avatar, first_name, last_name } = ret.user;
			this.setState({ ...this.state, avatar,  first_name, last_name});
	  	}).catch (err => {
	      	return err.message;
		});
  	}

	goBack = () => {
		this.props.navigation.navigate('App');
	}

	tapMenu = (menu) => {
		if (menu == 'LOGOUT') {
			onSignOut();
			this.props.navigation.navigate('Auth');
		}
	}

	openAvatar = () => {
		
	}

	_keyExtractor = (item, index) => index+'';

	_renderItem = (item) => {
		return(
			<TouchableOpacity 
				onPress={() => this.tapMenu(item.item)}
				style={{ 
					flexDirection: 'row',
					justifyContent: 'space-between',
					borderBottomWidth: 1,
					borderColor: '#ddd',
					paddingVertical: 10,
					paddingHorizontal: 12 }}>
				<Text>{item.item}</Text>
				<Icon name="chevron-right" size={25} type="evil-icon" />
			</TouchableOpacity>
		)
	}

	render() {
		const { avatar, first_name, last_name } = this.state;
		return(
			<View style={{ flex: 1 }}>
				<Header
		          containerStyle={{
		            backgroundColor: colors.pinkColor,
		          }} 
		          leftContainerStyle= {{
		            marginLeft: 20
		          }}   
		          leftComponent={<TouchableOpacity onPress={() => this.goBack()}><Icon name='ios-arrow-back' type='ionicon' size={35} /></TouchableOpacity>}
		          centerComponent={{ text: 'DIGIIDROBE', style: { fontSize: 22, fontWeight: 'bold' } }}
	        	/>
	        	<View style={{ alignItems: 'center', marginTop: 40 }}>
		        	<Avatar
		                size="xlarge"
		                rounded
		                source={{uri: avatar}}
		                onPress={() => this.openAvatar()}
		                activeOpacity={0.7}
	              	/>
	              	<Text style={{ marginVertical: 20, fontSize: 22, fontWeight: 'bold' }}>{first_name + ' ' + last_name}</Text>
	        	</View>
              	<FlatList
			        data={menuData}
			        keyExtractor={this._keyExtractor}
			        renderItem={this._renderItem}
			      />
			</View>
		);
	}
}