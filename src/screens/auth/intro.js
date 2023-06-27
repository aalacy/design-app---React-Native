import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

import { Button } from 'react-native-elements'
import Swiper from 'react-native-swiper';

import DotControl from '../../components/dotcontrol';
import Bottom     from '../../components/bottom';
import colors from '../../const/colors';

export default class Intro extends Component {
	state = {
		nextButtonDisabled: false,
	};

	onNext = () => {
		let swiper = this.refs.swiper;
		const { total, index } = swiper.state;
		if (index + 1 < total) {
    		swiper.scrollBy(1);
		}
  	}

  	onSignUp = () => {
  		this.props.navigation.navigate('UserProfile')
  	}

  	onLogIn = () => {
		  this.props.navigation.navigate('SignUp')
  	}

  	onTo = (idx) => {
  		let swiper = this.refs.swiper;
  		// const { total, index } = swiper.state;
  		// if (index < idx) {
  		// 	for (let i = 0; i < idx - index; i++)
  		// 	{
  		// 		this.refs.swiper.scrollBy(1);
  		// 	}
  		// } 
  		// if (index > idx) {
  		// 	for (let i = 0; i < index - idx; i++)
  		// 	{
  		// 		this.refs.swiper.scrollBy(-1);
  		// 	}
  		// }
  	}

	_onMomentumScrollEnd = (e, state, context) => {
	    this.setState({ nextButtonDisabled: state.index == 2});
	}

  onSkip = () => {
    this.props.navigation.navigate('SignUp');
  }

  renderTopBar = () => {
    return(
      <View style={{ width: '100%'}}>
        <View style={styles.topBar} />
        <View style={{ alignItems: 'flex-end', marginRight: 15, marginVertical: 15 }}>
          <TouchableOpacity onPress={() => this.onSkip()}>
            <Text style={{ color: colors.primaryColor, fontSize: 20 }}>skip</Text>
          </TouchableOpacity>
        </View>
      </View>        
    )
  }

  render(){
	   const { nextButtonDisabled } = this.state;

  	const renderPagination = (index, total, context) => {
  		const firstColor = index == 0 ? colors.grayColor : colors.primaryColor;
  		const secondColor = index == 1 ? colors.grayColor : colors.primaryColor;
  		const thirdColor = index == 2 ? colors.grayColor : colors.primaryColor;
	  	return (
	  		 <View style={styles.buttonContainer}>
	    	 	<View style={styles.paginationStyle}>
		          <DotControl
		          	onPress={this.onTo(0)}
		            type={index == 0 ? "long": ""}
		            color={firstColor}
		          />
		          <DotControl
		          	onPress={this.onTo(1)}
		          	type={index == 1 ? "long": ""}
		            color={secondColor}
		          />
		          <DotControl
		          	onPress={this.onTo(2)}
		          	type={index == 2 ? "long": ""}
		            color={thirdColor}
		          />
	        	</View>
	        	{ (index + 1) != total ? <TouchableOpacity 
	              disabled={nextButtonDisabled}
	              style={styles.nextButton}
	              onPress={this.onNext}
	            ><Text style={{ color: 'white', padding: 5 }}>Next</Text></TouchableOpacity> : <View style={{ width: 65, height: 25 }}/>}
	        </View>
	  )
	}

    return (
    	<View style={styles.wrapper} >
        {this.renderTopBar()}

		     <Swiper 
		     	ref="swiper"
          height={400}
		     	onMomentumScrollEnd={this._onMomentumScrollEnd}
		     	renderPagination={renderPagination}
		      	loop={false}>
		        <View style={styles.slide}>
		       	  	<Image resizeMode="contain" source={require('../../../assets/images/intro1.png')} style={[styles.image]}/>
		          	<Text style={styles.description}>What if you can have 24  hours personal stylist ?</Text>
		        </View>
		        <View style={styles.slide}>
		         	<Image resizeMode="contain" source={require('../../../assets/images/intro2.png')} style={[styles.image]}/>
		         	<Text style={styles.description}>What if someone can Pack your bag every time you Travel ?</Text>
		        </View>
		        <View style={styles.slide}>
		          <Image resizeMode="contain" source={require('../../../assets/images/intro3.png')} style={[styles.image]}/>
		          <Text style={styles.description}>And you can have someone clean your wardrobe ?</Text>
		        </View>
		      </Swiper>
	      	<View style={styles.authButtonContainer}>
		      	<Button 
	              buttonStyle={styles.signupButton}
	              title="Sign Up"
	              onPress={this.onSignUp}
	            />
	            <Button 
	              buttonStyle={styles.loginButton}
	              title="Log In"
	              titleStyle={{ color: colors.loginTextColor }}
	              onPress={this.onLogIn}
	            />
		      </View>
	      <Bottom />
      	</View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
  	flex: 1,
  	alignItems: 'center',
  },
  slide: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 200,
  },
  topBar: {
  	height: 60,
  	backgroundColor: colors.pinkColor,
  	width: '100%'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingRight: 0,
    marginRight:40,
    width: '100%',
    paddingTop: 0,
    marginBottom: 80,
  },
  description: {
  	fontSize: 20,
  	fontWeight: 'bold',
  	marginRight: 25,
  	marginLeft: 25,
  	marginTop: 30,
  	textAlign: 'center',
  },
   paginationStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 50,
  },
  authButtonContainer: {
  	flexDirection: 'row',
  	width: '100%',
  	paddingRight: 20,
  	paddingLeft: 20,
  	justifyContent: 'space-around',
  	marginBottom: 30,
  },
  signupButton: {
    paddingHorizontal: 30,
  	height: 45,
    backgroundColor: colors.primaryColor,
    marginRight: 30,
  },
  loginButton: {
    paddingHorizontal: 30,
  	height: 45,
    borderWidth: 2,
    borderColor: colors.grayColor,
    backgroundColor: colors.whiteColor,
  },
  invisibleNextButton: {
    width: 76,
    height: 32,
  },
   nextButton: {
    paddingRight: 14,
    paddingLeft: 14,
    borderRadius: 4,
    backgroundColor: colors.grayColor,
  },
  slide1: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide2: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide3: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
})