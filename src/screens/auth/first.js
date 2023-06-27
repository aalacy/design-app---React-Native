import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  Image,
  View,
  Platform,
} from 'react-native';

import Logo   from '../../components/logo';
import colors from '../../const/colors';
import { isSignIn } from '../../helpers';

export default class First extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  _navigate = (res) => {
   if (Platform.OS == 'android') {
      //  this._detailNavigate(res);
        setTimeout(() => this._detailNavigate(res), 2000);
      } else {
        this._detailNavigate(res);
      }
  }

  _detailNavigate = (res) => {
    console.log('res in first', res);
    this.props.navigation.navigate( res.status == 'true' ? 'App' : 'Auth')
  }
  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    isSignIn()
      .then(res => {
        this._navigate(res);
      })
      .catch(err => {
        this._navigate('false');
      });
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.primaryColor }}>
        <Logo />
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}
