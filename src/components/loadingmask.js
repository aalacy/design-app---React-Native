import React from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, Image, TouchableOpacity, Dimensions, TouchableWithoutFeedback, Keyboard, ScrollView, Modal } from 'react-native';

import normalize from '../helpers/sizeHelper';

import { Overlay } from 'react-native-elements';


const { height, width } = Dimensions.get('window');


class LoadingMask extends React.Component {

  render() {

    return (
      <Overlay width="auto" height="auto" windowBackgroundColor="rgba(255,255,255,0.5)"  overlayBackgroundColor='transparent' isVisible>
        <View style={styles.screen} >
        <Image style={styles.loadingImage} source={require('../../assets/icons/loading.gif')}></Image>
        </View>
      </Overlay>
    );

  }

}


const styles = StyleSheet.create({
  screen: {
    flex: 1,
     zIndex: 100,
     alignItems: 'center',
    justifyContent: 'center'
  },
  label: {
    fontSize: normalize(24),
    color: '#42c000',
    textAlign: 'center',
    margin: 15
  },
  loadingImage: {
    width: 40,
    height: 40,
  }
});



export default LoadingMask;