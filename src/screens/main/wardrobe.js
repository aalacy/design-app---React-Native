import React from 'react';
import { StyleSheet, Text, View, Alert, Keyboard, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Icon, Input, Header } from 'react-native-elements'

import Logo     from '../../components/logo';
import Bottom   from '../../components/bottom';
import colors   from '../../const/colors';
import Loading  from '../../components/loading';

import * as commonActions from '../../actions/common';
import * as userActions from '../../actions/user';

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


class Wardrobe extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      email_err: '',
      password_err: '',
      error: false,
    };

  }

  async componentDidMount() {
    // TODO: You: Do firebase things
    // const { user } = await firebase.auth().signInAnonymously();
    // console.warn('User -> ', user.toJSON());

    // await firebase.analytics().logEvent('foo', { bar: '123'});

    // Save isFirstLaunch to skip intro screen next time
  }

  render() {
    const { email, password, email_err, password_err } = this.state;

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
              centerComponent={{ text: 'DIGIIDROBE', style: { fontSize: 22, fontWeight: 'bold' } }}
            />
            <Text>Wardrobe</Text>
        </View>
		);
	}
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.primaryColor,
    justifyContent: 'center',
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(Wardrobe);

