import React from 'react';
import { StyleSheet, Text, View, Alert, Dimensions, Keyboard, FlatList, Image, TouchableOpacity, AsyncStorage, ScrollView } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DrawerActions } from 'react-navigation';
import { Button, Icon, Input, Header, Avatar, Card } from 'react-native-elements'

import Logo     from '../../components/logo';
import Bottom   from '../../components/bottom';
import colors   from '../../const/colors';
import Loading  from '../../components/loading';
import CircleLoading from '../../components/circleloading';

import * as commonActions from '../../actions/common';
import * as userActions from '../../actions/user';

const { height, width } = Dimensions.get('window');

const mapDispatchToProps = (dispatch) => {
  return ({
    userActions: bindActionCreators({...userActions}, dispatch),
    commonActions: bindActionCreators({...commonActions}, dispatch)
  });
}

const mapStateToProps = (state) => {
  return ({
    user: state.user.user,
    loading: state.common.loading,
    label: state.common.label,
    brands: state.user.brands,
    celebrities: state.user.celebrities,
  });
}


class Home extends React.Component {
  	constructor() {
	    super();
	    this.state = {
		  avatar: 'https://digiidrobe.com/storage/users/15452543979kwCMHPx1P.png',
		  first_name: '',
	      error: false,
	    };
  	}

  	async componentDidMount() {
    // TODO: You: Do firebase things
    // const { user } = await firebase.auth().signInAnonymously();
    // console.warn('User -> ', user.toJSON());

    // await firebase.analytics().logEvent('foo', { bar: '123'});

	    await AsyncStorage.setItem('userToken', 'abc');

	    storage.load({ key: 'user' }).then(ret => {
			const { avatar, first_name, last_name } = ret.user;
			this.setState({ ...this.state, avatar,  first_name, last_name});
	  	}).catch (err => {
	      	return err.message;
		});

	    this.props.userActions.getCelebrities();
	    this.props.userActions.getBrands();
  	}

	openAvatar = () => {

	}

	showMenu = () => {
		this.props.navigation.navigate('Menu');
	}

	_keyExtractor = (item, index) => index + '';

	renderCelebrity = (celebrity) => {
		return (<TouchableOpacity key={celebrity.id} style={styles.celebrityItemContainer}>
			 <Avatar
	            size="large"
	            rounded
	            source={{ uri: celebrity.avatar }}
	            onPress={() => this.openAvatar()}
	            activeOpacity={0.7}
	          />
	          <Text>{celebrity.first_name}</Text>
		</TouchableOpacity>);
	};

	renderBrand = (brand) => {
		return (<TouchableOpacity key={brand.id} style={styles.brandItemContainer}>
				<View style={{ width: 4, backgroundColor: colors.grayColor }}></View>
				 <Image
				 	resizeMode="cover"
		            source={{ uri: brand.image }}
		            style={{width: 140, height: 50, paddingHorizontal: 20 }}
		            onPress={() => this.openAvatar()}
		          />
		</TouchableOpacity>);
	}

  	render() {
    	const { avatar, first_name } = this.state;
    	console.log('avatar', avatar);
    	return (
	        <View 
	          style={{ flex: 1 }}
	          onStartShouldSetResponder={(e) => Keyboard.dismiss()}>
	          <Header
		          containerStyle={{
		            backgroundColor: colors.pinkColor,
		          }} 
		          leftContainerStyle= {{
		            marginLeft: 20
		          }}   
		          leftComponent={<TouchableOpacity><Icon onPress={this.showMenu} name='menu' size={25} /></TouchableOpacity>}
		          centerComponent={{ text: 'DIGIIDROBE', style: { fontSize: 22, fontWeight: 'bold' } }}
	        	/>
	        	<ScrollView>
		        	<View style={{ flex: 1 }}>
		        	   	<View style={styles.avatarContainer}>
			          		<Avatar
				                size="large"
				                rounded
				                source={{uri: avatar}}
				                onPress={() => this.openAvatar()}
				                activeOpacity={0.7}
				              />
			              	<View style={{ marginLeft: 12 }}>
				              	<Text style={{ fontSize: 20 }}>Good Morning</Text>
				              	<Text style={{ fontSize: 20, fontWeight: 'bold' }}>{first_name}</Text>
				              </View>
			          	</View>
			          	<Card containerStyle={styles.cardviewContainer} >
			          		<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
			          			<TouchableOpacity style={{ marginLeft: 20, flexDirection: 'row', alignItems: 'center'}}>
			          				<Icon 
			          					name="plus-square"
			          					type="font-awesome"
			          					size={25}
			          				/>
			          				<Text style={styles.text}>Celebrities</Text>
			          			</TouchableOpacity>
			          			<TouchableOpacity style={{ backgroundColor: 'transparent' }} >
			          				<Text style={{  color: 'red', fontSize: 13 }}>All Celebrities</Text>
			          			</TouchableOpacity>
			          		</View>
			          		{this.props.celebrities.length ? <FlatList 
			          			horizontal={true}
			          			keyExtractor={this._keyExtractor}
			          			data={this.props.celebrities}
			          			renderItem = {(item)=> this.renderCelebrity(item.item)}
			          		/>  : <CircleLoading />}
			          	</Card>
			          	<View style={styles.flatContainer} >
			          		<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
			          			<TouchableOpacity style={{ marginLeft: 20, flexDirection: 'row', alignItems: 'center'}}>
			          				<Icon 
			          					name="plus-square"
			          					type="font-awesome"
			          					size={25}
			          				/>
			          				<Text style={styles.text}>Brands</Text>
			          			</TouchableOpacity>
			          			<TouchableOpacity style={{ backgroundColor: 'transparent' }} >
			          				<Text style={{  color: 'red', fontSize: 13 }}>All Brands</Text>
			          			</TouchableOpacity>	
			          		</View>
			          		{this.props.brands.length ? <FlatList 
			          			horizontal={true}
			          			keyExtractor={this._keyExtractor}
			          			data={this.props.brands}
			          			renderItem = {(item)=> this.renderBrand(item.item)}
			          		/> : <CircleLoading />}
			          	</View>
			          	<Card containerStyle={styles.cardviewContainer} >
			          		<View style={{ marginLeft: 20, flexDirection: 'row', alignItems: 'center'}}>
		          				<Icon 
		          					name="timer"
		          					type="material-community"
		          					size={25}
		          				/>
		          				<Text style={styles.text}>Today Calendar</Text>
		          			</View>
		          			<View style={{ marginLeft: 30, marginTop: 12 }}>
			          			<View style={{flexDirection: 'row'}}>
			          				<Text style={styles.text}>07.30</Text>
			          				<View style={{ width: 3, backgroundColor: colors.grayColor, marginLeft: 15 }}></View>
			          				<Text style={styles.text}>Weekly Meeting</Text>
			          			</View>
		          				<View style={{flexDirection: 'row'}}>
			          				<Text style={styles.text}>12.30</Text>
			          				<View style={{ width: 3, backgroundColor: colors.grayColor, marginLeft: 15 }}></View>
			          				<Text style={styles.text}>Interview</Text>
			          			</View>
		          			</View>
			          	</Card>
		          	</View>
		        </ScrollView>
	      	</View>
		);
	}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarContainer: {
  	flexDirection: 'row',
  	marginLeft: 12,
  	alignItems: 'center',
  	marginTop: 10,
  	paddingVertical: 18,
  },
  flatContainer: {
  	marginTop: 10,
  	paddingRight: 5,
  	paddingLeft: 5,
  	borderWidth: 0,
  	paddingVertical: 20,
  },
  cardviewContainer: { 
  	shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
    borderRadius: 6,
    paddingVertical: 20,
    paddingRight: 18,
    marginHorizontal: -10,
    marginVertical: 10,
  },
  celebrityItemContainer: { 
  	alignItems: 'center',
  	paddingRight: 25, 
  	marginTop: 10,
  },
  brandItemContainer: { 
  	flexDirection: 'row', 
  	paddingRight: 8, 
  	shadowColor: colors.blackColor,
  	shadowRadius: 2,
  	shadowOpacity: 0.8,
  	shadowOffset: { width: 0, height: 0},
  	elevation: 1,
  	marginHorizontal: 2,
  	marginVertical: 2,
  },
  text: {
  	color: 'black',
  	fontWeight: 'bold',
  	fontSize: 15,
  	marginLeft: 12,
  	paddingVertical: 3,
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(Home);

