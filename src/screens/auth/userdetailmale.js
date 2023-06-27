import React from 'react';
import {Animated, Dimensions, StyleSheet, Text, Alert, View, ScrollView, Image, TouchableOpacity, Button as MyButton } from 'react-native';

import { Button, Icon, Header, Divider, Input } from 'react-native-elements'
import NumberSelectionList from '../../components/numberselectionlist';

import Bottom   from '../../components/bottom';
import colors   from '../../const/colors';

const deviceWidth = Dimensions.get('window').width
const horizontalMargin = 10;
const slideWidth = 30;
 
const itemWidth = slideWidth + horizontalMargin * 2;
const FIXED_BAR_WIDTH = 280
const BAR_SPACE = 10

let NeckItems = [];
let ChestItems = [];
let SleeveItems = [];
let WaistItems = [];
let HipsItems = [];
let InseamItems = [];
let ShoesSizeItems = [];
for (var i = 0; i < 60; i++) {
  NeckItems.push(i);
  ChestItems.push(i);
  SleeveItems.push(i);
  InseamItems.push(i);
  WaistItems.push(i);
  HipsItems.push(i);
  ShoesSizeItems.push(i);
}

export default class UserDetailMale extends React.Component {

 	  goBack = () => {
	    this.props.navigation.goBack();
  	}

  	onContinue = () => {
      const _setting = this.props.navigation.getParam('setting');
      console.log('setting', _setting);
      const body_type_male = this.props.navigation.getParam('body_type_male');
      const { bust, bra, waist, hips, shoes_size } = this.state;
      const setting = {
        height: _setting.height,
        weight: _setting.weight,
        gender: this.props.navigation.getParam('gender'),
        body_type_male,
        bust,
        bra,
        hips,
        shoes_size
      };

      this.props.commonActions.start("User setting");
      this.props.userActions.userSetting(setting).then(res => {
        this.props.commonActions.end();
        console.log(res);
        if (res == 'success') {
          this._onSkip();
        } else {
          Alert.alert(res);
        }
      });
    }

    _renderItem ({item, index}) {
        return (
            <View key={index} style={styles.slide}>
                <Text style={styles.title}>{ item }</Text>
            </View>
        );
    }

    onScroll (callback) {
      // console.log(callback)
    }

    _onSkip = () => {
      this.props.navigation.navigate('App');
    }

  	render() {
      const image = this.props.navigation.getParam('source');
	    return (
	      	<View style={styles.container}>
	        	<Header
		          containerStyle={{
		            backgroundColor: colors.pinkColor,
		          }} 
		          leftContainerStyle= {{
		            marginLeft: 20
		          }}   
		          leftComponent={<Icon name='ios-arrow-back' type='ionicon' size={35} onPress={this.goBack} />}
		          centerComponent={{ text: 'User Detail', style: { fontSize: 20, fontWeight: '600' } }}
              rightComponent={<TouchableOpacity onPress={this._onSkip}><Text style={styles.skipLabel}>Skip</Text></TouchableOpacity>}
	        	/>
            <ScrollView>
            <View style={{ flex: 1, alignItems: 'center' }}>
              <Text style={styles.titleText}>Don't worry you can still add it later</Text>
  	        	
              <View style={styles.imageContainer}>
                <View style={styles.activeBodyItem}>				 
                  <Image style={{ height: 126 }} source={image}/>
                </View>
                <Text style={styles.typeText}>Triangle</Text>
              </View>

              <Text style={styles.label}>Neck</Text>
              <NumberSelectionList
                data={NeckItems}
              />
              <Divider style={styles.divider}/>

              <Text style={styles.label}>Chest</Text>
              <NumberSelectionList
                data={ChestItems}
              />
              <Divider style={styles.divider}/>

              <Text style={styles.label}>Sleeve</Text>
              <NumberSelectionList
                data={SleeveItems}
              />
              <Divider style={styles.divider}/>

              <Text style={styles.label}>Waist</Text>
              <NumberSelectionList
                data={WaistItems}
              />
              <View style={styles.divider}/>

              <Text style={styles.label}>Hips</Text>
              <NumberSelectionList
                data={HipsItems}
              />
              <View style={styles.divider}/>
             
              <Text style={styles.label}>Inseam</Text>
              <NumberSelectionList
                data={InseamItems}
              />
              <Divider style={styles.divider}/>

              <Text style={styles.label}>Shoes Size</Text>
              <NumberSelectionList
                data={ShoesSizeItems}
              />
              <View style={styles.divider}/>
          		
              <Button 
                raised
                buttonStyle={styles.continueButton}
                title="Continue"
                onPress={this.onContinue}
              />
            </View>
            </ScrollView>
	    	</View>
		  )
		}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipLabel: {
    fontSize: 17,
    color: colors.headerTextColor,
  },
  slide: {
  },
  title: {
    fontSize: 20,
  },
  label: {
    width: '100%',
    paddingLeft: 50,
    paddingBottom: 25,
    textAlign: 'left',
    fontSize: 25,
  },
  bar: {
    width: 30,
    height: 3,
    backgroundColor: colors.primaryColor,
  },
  imageContainer: { 
    flexDirection: 'row', 
    alignItems: 'flex-end',
    width: '100%',
    marginTop: 20,
    marginLeft: 20,
  },
  typeText: {
    marginLeft: 12,
    fontSize: 22,
    marginBottom: 30,
  },
  activeBodyItem: {
	  borderColor: colors.borderColor,
  	borderWidth: 2,
  	height: 128,
  	marginBottom: 20,
    marginRight: 15,
  	paddingRight: 15,
  	paddingLeft: 15,
  },
  bodyItem: {
  	backgroundColor: colors.bodyBackgroundColor,
  	height: 106,
  	marginBottom: 20,
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
  titleText: {
    fontSize: 20,
    color: colors.textGrayColor,
    marginTop: 30,
    marginLeft: 25,
  },
  divider: {
    width: deviceWidth - 30,
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
    marginTop: 10,
    backgroundColor: colors.primaryColor,
    marginBottom: 15,
  }
})