import React from 'react';
import { StyleSheet, Dimensions, Text, View, ScrollView, Image, Alert, TouchableOpacity, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Icon, Header, Divider, Input } from 'react-native-elements'

import Bottom   from '../../components/bottom';
import colors   from '../../const/colors';
import Loading  from '../../components/loading';

import * as commonActions from '../../actions/common';
import * as userActions from '../../actions/user';

// const deviceHeight = Dimensions.get('window').height;

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
    label: state.common.label
  });
}

const deviceWidth = Dimensions.get('window').width

class UserDetail extends React.Component {
  	constructor() {
	    super();
	    this.state = {
        height: '170',
        weight: '70',
        body_type_female: '',
        body_type_male: '',
        item: require('../../../assets/images/female_type3.png'),
        index: 2,
	      selectedIndex: 0,
	      tyle: 'female',
	      females: [
	      	{
	      		source: require('../../../assets/images/female_type1.png'),
	      		active: false,
	      	},
	      	{
	      		source: require('../../../assets/images/female_type2.png'),
	      		active: false,
	      	},
	      	{
	      		source: require('../../../assets/images/female_type3.png'),
	      		active: false
	      	},
	      	{
	      		source: require('../../../assets/images/female_type4.png'),
	      		active: false,
	      	},
	      	{
	      		source: require('../../../assets/images/female_type5.png'),
	      		active: false,
	      	},
      	  ],
      	  males: [
	      	{
	      		source: require('../../../assets/images/male_type1.png'),
	      		active: false,
	      	},
	      	{
	      		source: require('../../../assets/images/male_type2.png'),
	      		active: false,
	      	},
	      	{
	      		source: require('../../../assets/images/male_type3.png'),
	      		active: false
	      	},
	      	{
	      		source: require('../../../assets/images/male_type4.png'),
	      		active: false,
	      	},
	      	{
	      		source: require('../../../assets/images/male_type5.png'),
	      		active: false,
	      	}
	      ]
	    };
  	}

    componentDidMount() {
      const gender = this.props.navigation.getParam('gender');
      if (gender == 1) { // 
        this.onMaleItemSelected(2);
      } else {
        this.onFemaleItemSelected(2);
      }
    }

 	  goBack = () => {
	    this.props.navigation.goBack();
  	}

  	onFemaleItemSelected = (index) => {
  		const females = this.state.females;
  		females.map((item, _idx) => {
  			item.active = index == _idx;
  		});
  		const males = this.state.males;
  		males.map((item, _idx) => {
  			item.active = false;
  		});
  		this.setState({ females, males, type: 'female', item: females[index].source, index, body_type_female: index });
  	}

  	onMaleItemSelected = (index) => {
  		const females = this.state.females;
  		females.map((item, _idx) => {
  			item.active = false;
  		});
  		const males = this.state.males;
  		males.map((item, _idx) => {
  			item.active = index == _idx;
  		});

  		this.setState({ males, females, type: 'male', item: males[index].source, index, body_type_male: index  });
  	}

    onChange = (name, value) => {
      this.setState({ ...this.state, [name]: value });
    }

  	onContinue = () => {

      const setting = {
        height: this.state.height,
        weight: this.state.weight,
        gender: this.props.navigation.getParam('gender'),
      };

      if (this.state.body_type_male) {
        setting.body_type_male = this.state.body_type_male;
      } else {
        setting.body_type_female = this.state.body_type_female;
      }

      this.props.commonActions.start("User setting");
      this.props.userActions.userSetting(setting).then(res => {
        this.props.commonActions.end();
        if (res.status == 'success') {
          if (this.state.type === 'male') {
            this.props.navigation.push('UserDetailMale', { source: this.state.item, index: this.state.index, setting: res.data, body_type_male: this.state.body_type_male, gender: setting.gender});
          } else  {
            this.props.navigation.push('UserDetailFemale', { source: this.state.item, index: this.state.index, setting: res.data, body_type_female: this.state.body_type_female, gender: setting.gender });
          }
        } else {
          Alert.alert(res.status);
        }
      });
  	}

  	render() {
      const { height, weight } = this.state;

  		const females = this.state.females && this.state.females.map((item, index) => {
  			const itemStyle = item.active ? styles.activeBodyItem : styles.bodyItem;
  			const imageHeight = item.active ? 126 : 106;
  			 return ( 
  			 	<TouchableOpacity key={index} onPress={() => this.onFemaleItemSelected(index)} style={itemStyle} >
                	<Image style={{ height: imageHeight }} source={item.source}/>
                </TouchableOpacity>
	        );
  		})
  		const males = this.state.males && this.state.males.map((item, index) => {
  			const itemStyle = item.active ? styles.activeBodyItem : styles.bodyItem;
  			const imageHeight = item.active ? 126 : 106;
  			 return ( 
  			 	<TouchableOpacity key={index} onPress={() => this.onMaleItemSelected(index)} style={itemStyle} >
                	<Image style={{ height: imageHeight }} source={item.source}/>
                </TouchableOpacity>
	        );
  		})

	    return (
	      	<View style={{ flex: 1 }} onStartShouldSetResponder={(e) => Keyboard.dismiss()}>
    	 		<TouchableWithoutFeedback  onPress={Keyboard.dismiss} accessible={false}>
	        	<Header
		          containerStyle={{
		            backgroundColor: colors.pinkColor,
		          }} 
		          leftContainerStyle= {{
		            marginLeft: 20
		          }}   
		          leftComponent={<Icon name='ios-arrow-back' type='ionicon' size={35} onPress={this.goBack} />}
		          centerComponent={{ text: 'User Detail', style: { fontSize: 20, fontWeight: '600' } }}
	        	/>
		        	<View style={styles.container}>
			        	<Text style={{ fontSize: 25, marginTop: 40 }}>Body Style</Text>
			        	<Text style={{ fontSize: 17, opacity: 0.45, marginTop: 16 }}>Select your body style !</Text>
		        	</View>
						  <View style={styles.slide}>
			        		{females}
		        		</View>
		        		<View style={styles.slide}>
			        		{males}
		        		</View>
                <View style={styles.container}>
			        	  <Divider style={styles.divider} />
                </View>

		        		<View style={styles.inputgroupContainer}>
		        			<View style={{ alignItems: 'center' }}>
		        				<Text style={styles.text}>Height</Text>
		        				<Input 
                      value={height}
                      onChangeText={(height) => this.onChange("height", height)}
                      inputContainerStyle={styles.inputContainerStyle}
                      keyboardType="number-pad"
                      />
		        			</View>
		        			<View style={{ alignItems: 'center' }}>
		        				<Text style={styles.text}>Weight</Text>
		        				<Input 
                      value={weight}
                      onChangeText={(weight) => this.onChange("weight", weight)}
                      inputContainerStyle={styles.inputContainerStyle}
                      keyboardType="number-pad"
                      />
		        			</View>
	        		</View>
	    	 		<View style={styles.container}>
		        		 <Button 
			              raised
			              buttonStyle={styles.continueButton}
			              title="Continue"
			              onPress={this.onContinue}
			            />
		            </View>
	    		</TouchableWithoutFeedback>
         {this.props.loading && <Loading /> }
	    	</View>
		  )
		}
}


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  slide: {
  	flexDirection: 'row',
  	alignItems: 'flex-end',
  	justifyContent: 'space-around',
  	marginTop: 16,
  	paddingLeft: 20,
  	paddingRight: 20,
  	height: 130,
  },
  activeBodyItem: {
	borderColor: colors.borderColor,
  	borderWidth: 2,
  	height: 128,
  	paddingRight: 10,
  	paddingLeft: 10,
  },
  bodyItem: {
  	backgroundColor: colors.bodyBackgroundColor,
  	height: 106,
  	paddingLeft: 10, 
  	paddingRight: 10,
  },
  inputgroupContainer: { 
  	width: '100%',
  	flexDirection: 'row',
  	justifyContent: 'space-around',
  	marginTop: 20 
  },
  text: {
  	fontSize: 25,
  },
  divider: {
    width: deviceWidth - 60,
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: colors.grayColor,
    height: 1,
  },
  inputContainerStyle: { 
  	marginTop: 8,
  	width: 110,
  	borderWidth: 1, 
  	borderColor: colors.blackColor 
  },
  continueButton: {
    width: 285,
    height: 45,
    marginTop: 60,
    backgroundColor: colors.primaryColor,
    marginBottom: 15,
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(UserDetail);
