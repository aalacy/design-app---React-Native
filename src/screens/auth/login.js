import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button, Icon, Input } from 'react-native-elements'

import Logo     from '../../components/logo';
import Bottom   from '../../components/bottom';
import colors   from '../../const/colors';


export default class LogIn extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  async componentDidMount() {
    // TODO: You: Do firebase things
    // const { user } = await firebase.auth().signInAnonymously();
    // console.warn('User -> ', user.toJSON());

    // await firebase.analytics().logEvent('foo', { bar: '123'});
  }

  onNewUser = () => {
    this.props.navigation.push('UserProfile');
  }

  onLogIn = () => {
    this.props.navigation.push('LogIn');
  }

  render() {
    return (
        <View style={styles.container}>
          <Logo />
            <View style={styles.inputContainer}>
              <Input
                placeholder="Your Email"
                shake={true}
                containerStyle={styles.containerStyle}
                leftIcon={
                  <Icon
                    name='mail'
                    size={30}
                    type='foundation'
                  />
                }
              />
              <Input
                placeholder="Your Password"
                shake={true}
                containerStyle={styles.containerStyle}
                leftIcon={
                   <Icon
                    name='lock'
                    size={30}
                    type='foundation'
                  />
                }
              />
            </View>
          <Button 
            title="Forgot Password ?"
            buttonStyle={styles.fortgotButton}
          />
          <View style={styles.signupButtonContainer}>
            <Button 
                raised
                buttonStyle={styles.signupButton}
                title="New User"
                onPress={this.onNewUser}
              />
              <Text style={{ color: colors.whiteColor, fontSize: 20 }}> OR </Text>
            <Button 
              raised
              buttonStyle={styles.signupButton}
              title="Login"
              onPress={this.onLogIn}
            />
          </View>
          <Text style={styles.text}>Sign Up with Social Media</Text>
          <View style={styles.socialContainer}>
             <Button
                title=""
                icon={<Icon name="sc-facebook"  type='evilicon' size={28} color={colors.blueColor} />}
                buttonStyle={styles.socialButtonStyle}
              />
               <Button
                title=""
                icon={<Icon name="twitter"  type='font-awesome' size={20} color={colors.blueColor} />}
                buttonStyle={styles.socialButtonStyle}
              />
               <Button
                title=""
                icon={<Icon name="google-plus"  type='font-awesome' size={15} color={colors.blueColor} />}
                buttonStyle={styles.socialButtonStyle}
              />
          </View>
          <Text style={styles.bottomText}> 
            By creating an account you agree to our
            Terms of Service and Privacy Policy 
          </Text>
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
  },
  inputContainer: {
    marginTop: 15,
    width: '100%',
    paddingRight: 40,
    paddingLeft: 40,
  },
  containerStyle: {
    width: '100%',
    backgroundColor: colors.whiteColor,
    marginBottom: 14,
  },
  signupButtonContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingRight: 40,
    paddingLeft: 40,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  fortgotButton: {
    backgroundColor: 'transparent',
  },
  signupButton: {
    width: 96,
    height: 45,
    backgroundColor: colors.grayColor,
  },
  buttonTitleStyle: {
    color: colors.textColor,
    fontWeight: 'bold',
    fontSize: 18,
  },
  text: {
    color: colors.whiteColor,
    fontSize: 18,
    marginTop: 40,
  },
  bottomText: {
    color: colors.whiteColor,
    fontSize: 10,
    width: '100%',
    textAlign: 'center',
    lineHeight: 20,
    paddingLeft: 80,
    paddingRight: 80,
    marginBottom: 35,
    marginTop: 30,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginTop: 20,
    paddingLeft: 70,
    paddingRight: 70,
  },
  socialButtonStyle: {
    width: 56,
    height: 56,
    backgroundColor: 'transparent',
    borderColor: colors.whiteColor,
    borderWidth: 1,
    borderRadius: 28,
  },
});
