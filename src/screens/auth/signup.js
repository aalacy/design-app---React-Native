import React from 'react';
import { StyleSheet, Text, View, Alert, Keyboard, ScrollView, KeyboardAvoidingView, TouchableOpacity, Platform, TouchableWithoutFeedback } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Icon, Input } from 'react-native-elements'

import { LoginManager, AccessToken, GraphRequest, GraphRequestManager } from "react-native-fbsdk";
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import firebase from 'react-native-firebase'

import Logo     from '../../components/logo';
import Bottom   from '../../components/bottom';
import colors   from '../../const/colors';
import LoadingMask  from '../../components/loadingmask';
import ApiLoadingMask from '../../components/apiloadingmask';
import { validateEmail, onSignIn }   from '../../helpers';

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

let tapButton = false;

class SignUp extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      email_err: '',
      password_err: '',
      error: false,
    };

    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    tapButton = false;
  }

  async componentDidMount() {
    // TODO: You: Do firebase things
    // const { user } = await firebase.auth().signInAnonymously();
    // console.warn('User -> ', user.toJSON());

    // await firebase.analytics().logEvent('foo', { bar: '123'});

    // Save isFirstLaunch to skip intro screen next time
  //  storage.save({ key: 'isFirstLaunch', data: { launched: 'true' } });
      GoogleSignin.configure();
  }

  gotoUserprofile = (first_name, last_name, email, image, driver, token) =>{
    this.props.navigation.navigate('UserProfile', {
              first_name,
              last_name,
              email,
              image,
              driver,
              token
            })
  }

  grantInfo = async () => {
   //  this.props.commonActions.start("LogIn");
    AccessToken.getCurrentAccessToken().then(
      (data) => {
        let accessToken = data.accessToken;

        const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);

        console.log(credential);
      // Login with the credential
      // return firebase.auth().signInWithCredential(credential);

        const responseInfoCallback = (error, result) => {
       //   this.props.commonActions.end();
           console.log(result);
          if (error) {
            alert('Error fetching data: ' + error.toString());
          } else {
            this.gotoUserprofile(result.first_name, result.last_name, result.email, result.picture.data.url, 'facebook', data.accessToken)
          }
        }

        const infoRequest = new GraphRequest(
          '/me',
          {
            accessToken: accessToken,
            parameters: {
              fields: {
                string: 'id,email,first_name,last_name,picture'
              }
            }
          },
          responseInfoCallback
        );

        // Start the graph request.
        new GraphRequestManager().addRequest(infoRequest).start()

      }
    )
  } 

  facebookLogin = async () => {

    const behavior = Platform.OS == 'android' ? 'web_only' : 'web';
    const self = this;
    LoginManager.logOut();
    LoginManager.setLoginBehavior(behavior);
    LoginManager.logInWithReadPermissions(["public_profile", "email"]).then(
      function(result) {
        console.log(result);
        if (result.isCancelled) {
          console.log("Login cancelled");
        } else {
          self.grantInfo();
        }
      },
      function(error) {
        console.log("Login fail with error: " + error);
      }
    );
  }

  googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('usernfo', userInfo);
      const { user } = userInfo; 
      debugger;
      this.gotoUserprofile(user.givenName, user.familyName, user.email, user.photo, 'google', userInfo.accessToken);
    } catch (error) {
       this.props.commonActions.end();
      console.log('google error', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  onNewUser = () => {
    
    tapButton = true;
    this.props.navigation.push('UserProfile');
  }

  onGotoPassword = () => {
    this.onChange("email", this.state.email);
    this.password.focus();
  }

  onLogIn = async () => {
    Keyboard.dismiss();

    await this.validate();

    if (this.state.email_err || this.state.password_err) {
      return Alert.alert('Warning', 'Please fix errors');
    }
    this.props.commonActions.start("LogIn");
    this.props.userActions.signIn(this.state.email, this.state.password).then(res => {
      this.props.commonActions.end();
        if (res == 'success') {
          //onSignIn();

          //this.props.navigation.navigate('App');
        } else {
          Alert.alert('Warning', res);
        }
    });
  }

  validate = async () => {
    await this.onChange("email", this.state.email);
    await this.onChange("password", this.state.password);
  }

  onChange = async (name, value) => {
    let errMesssage = !value ? "Required *" : "";
    if (name == 'email' && value) {
      errMesssage = validateEmail(value) ? '' : 'Email is invalid';
    }
    await this.setState({ ...this.state, error: errMesssage, [name+'_err']: errMesssage, [name]: value });
  }

  render() {
    const { email, password, email_err, password_err } = this.state;

    return (
        <ScrollView style={styles.container}>
        <View 
          style={styles.innerContainer}
          horizontal={false}
          onStartShouldSetResponder={(e) => Keyboard.dismiss()}>
          <Logo marginTop={70} />
          <TouchableWithoutFeedback  onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.inputContainer}>
              <Input
                placeholder="Your Email"
                shake={true}
                onChangeText={(email) => this.onChange("email", email)}
                containerStyle={styles.containerStyle}
                autoCapitalize = 'none'
                value={email}
                clearButtonMode="while-editing"
                errorStyle={{ color: 'red', backgroundColor: 'transparent' }}
                errorMessage={email_err}
                returnKeyType="next"
                onSubmitEditing={(keyPress) => this.onGotoPassword()}
                autoCorrect={false}
                keyboardType="email-address"
                leftIcon={
                  <Icon
                    name='mail'
                    size={30}
                    type='foundation'
                  />
                }
              />
              <Input
                ref={(e)=> this.password = e}
                placeholder="Your Password"
                shake={true}
                containerStyle={styles.containerStyle}
                onChangeText={(password) =>this.onChange("password", password)}
                autoCapitalize = 'none'
                value={password}
                clearButtonMode="while-editing"
                errorStyle={{ color: 'red' }}
                errorMessage={password_err}
                returnKeyType="done"
                autoCorrect={false}
                secureTextEntry={true}
                onSubmitEditing={this.onLogIn}
                leftIcon={
                   <Icon
                    name='lock'
                    size={30}
                    type='foundation'
                  />
                }
              />
            </View>
          </TouchableWithoutFeedback>
            <TouchableOpacity>
              <Text style={{ color: 'white', fontSize: 15 }}>
                Forgot Password ?
              </Text>
            </TouchableOpacity>
          <View style={styles.signupButtonContainer}>
            <Button 
                raised
                disabled={this.state.tapButton}
                buttonStyle={styles.signupButton}
                title="New User"
                onPress={this.onNewUser}
              />
              <Text style={{ color: colors.whiteColor, fontSize: 18 }}> OR </Text>
            <Button 
              raised
              buttonStyle={styles.signupButton}
              title="Login"
              onPress={this.onLogIn}
            />
          </View>
          <Text style={styles.text}>Sign Up with Social Media</Text>
          <View style={styles.socialContainer}>
              <TouchableOpacity
                onPress={() => this.facebookLogin()}
                style={styles.socialButtonStyle}
                >
                <Icon name="sc-facebook"  type='evilicon' size={28} color={colors.blueColor} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => console.log('twitter')}
                style={styles.socialButtonStyle}
                >
                <Icon name="twitter"  type='font-awesome' size={20} color={colors.blueColor} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.googleSignIn()}
                style={styles.socialButtonStyle}
                >
                <Icon name="google-plus"  type='font-awesome' size={15} color={colors.blueColor} />
              </TouchableOpacity>
          </View>
          <Text style={styles.bottomText}> 
            By creating an account you agree to our
            Terms of Service and Privacy Policy 
          </Text>
        </View>
        <ApiLoadingMask  />

        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryColor,
  },
  innerContainer: {
     flex: 1,
     justifyContent: 'center',
    alignItems: 'center',
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
    justifyContent: 'space-around',
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
    width: '60%',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 35,
    marginTop: 30,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginTop: 20,
    paddingLeft: 50,
    paddingRight: 50,
  },
  socialButtonStyle: {
    width: 56,
    height: 56,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderColor: colors.whiteColor,
    borderWidth: 1,
    borderRadius: 28,
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

