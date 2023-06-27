import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions, Platform, Image, Alert, NativeModules, TouchableOpacity, Modal, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Icon, Header, Avatar, Input, ButtonGroup } from 'react-native-elements'
import ActionSheet from 'react-native-actionsheet'
import ImageViewer from 'react-native-image-zoom-viewer';
import DatePicker from 'react-native-datepicker'
import moment from 'moment';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';

// import ImagePicker from 'react-native-image-crop-picker';

import { validateEmail, onSignIn, geocoder }   from '../../helpers';
import Bottom   from '../../components/bottom';
import colors   from '../../const/colors';
import LoadingMask  from '../../components/loadingmask';

import * as commonActions from '../../actions/common';
import * as userActions from '../../actions/user';

const deviceWidth = Dimensions.get('window').width;

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

const ImagePicker = NativeModules.ImageCropPicker;

class UserProfile extends React.Component {
    state = {
        isSocialLogin: this.props.navigation.getParam('driver', '') != '',
        driver: this.props.navigation.getParam('driver', ''),
        token: this.props.navigation.getParam('token', ''),
        image: {uri: this.props.navigation.getParam('image', 'https://digiidrobe.com/storage/users/15452543979kwCMHPx1P.png'), type: 'image/png', width: 50, height: 50, name:'avatar.png'},
        showPreview: false,
        user: {
          first_name: this.props.navigation.getParam('first_name', ''),
          last_name: this.props.navigation.getParam('last_name', ''),
          email: this.props.navigation.getParam('email', ''),
          password: '',
          address: '',
          birthday: 'Sep 20, 1980',
          gender: 1,
          latitude: -1,
          longitude: -1,
        },
        first_name_err: '',
        last_name_err: '',
        email_err: '',
        image_err: '',
        password_err: '',
        address_err: '',
        birthday_err: '',
        location_err: '',
        error: '',
        region: null,
    };

  componentDidMount() {
    // TODO: You: Do firebase things
    // const { user } = await firebase.auth().signInAnonymously();
    // console.warn('User -> ', user.toJSON());

    // await firebase.analytics().logEvent('foo', { bar: '123'});
    this.getCurrentLocation();
    // this.onContinue();
  }

  componentWillUnmount() {
    BackgroundGeolocation.removeAllListeners();
  }

  onContinue = () => {
    Keyboard.dismiss();

    const self = this;
    // Check if the avatar is choosen.
    this.setState({ ...this.state, avatar_err: !this.state.image }, () => {
      if (this.state.first_name_err ||
       this.state.last_name_err ||
       this.state.email_err ||
       this.state.address_err ||
       (!this.state.isSocialLogin && this.state.password_err) ||
       this.state.birthday_err ||
       this.state.location_err || 
       this.state.avatar_err) {
       Alert.alert('Warning', 'Please fix errors.');
      } else {  
        const user = new FormData();
        user.append('first_name', this.state.user.first_name);
        user.append('last_name', this.state.user.last_name);
        user.append('email', this.state.user.email);
        user.append('birthday', moment(this.state.user.birthday).format('YYYY-MM-DD'));
        user.append('avatar', this.state.image);
        user.append('gender', this.state.user.gender+'');
        user.append('address', this.state.user.address);
        user.append('latitude', this.state.user.latitude+'');
        user.append('longitude', this.state.user.longitude+'');

        let url = userActions.SIGNUP_URL;
        if (this.state.isSocialLogin) {
          user.append('driver', this.state.driver);
          user.append('token', this.state.token);
          url = userActions.SIGNUP_SOCIAL_URL;
        } else {
          user.append('password', this.state.user.password);
        }

        this.props.commonActions.start("SignUp");
        this.props.userActions.signUp(user, url).then(res => {
          onSignIn();

          self.props.commonActions.end();

          self.props.navigation.push('UserDetail', { gender: this.state.user.gender});
          // Alert.alert('Warning', res);
        });
      }
    });
  }

  updateIndex = (gender) => {
    const _gender = gender + 1 
    this.setState({ ...this.state, user: { ...this.state.user, gender: _gender }})
  }

  goBack = () => {
    this.props.navigation.navigate('SignUp');
  }

  onChange = name => (value) => {
    let errMesssage = value == '' ? "Required *" : "";
    if (name == 'email' && value) {
      errMesssage = validateEmail(value) ? '' : 'Email is invalid';
      if (!errMesssage) {
        this.checkEmail(value);
      }
    }
    this.setState({ ...this.state, [name+'_err']: errMesssage, user: { ...this.state.user, [name]: value  }});
  }

  checkEmail = (email) => {
    userActions.apiInstance.post(userActions.CHECK_EMAIL_URL, {
      email, 
    }).then(res => {
      // this.setState({ ...this.state, email})
      console.log('ok', res);
      if (res.data.is_used) {
        this.setState({ ...this.state, email_err: 'This email is already taken' });
      }
    }).catch(err => { 
      console.log(err);
    });
  }

  onChangeBirthday = value => {
    this.setState({ ...this.state, user: { ...this.state.user, birthday: value }});
  }

  openAvatar = () => {
    // if (this.state.image) {
    //   this.setState({ ...this.state, showPreview: true });
    // }
  }

  getCurrentLocation = () => {
        BackgroundGeolocation.getCurrentLocation(lastLocation => {
          let region = this.state.region;
          const latitudeDelta = 0.01;
          const longitudeDelta = 0.01;
          region = Object.assign({}, lastLocation, {
            latitudeDelta,
            longitudeDelta
          });
          const self = this;
          const { latitude, longitude } = lastLocation;
          geocoder(latitude, longitude).then(address => {
            self.setState({ ...self.state, user: { ...self.state.user,
                latitude,
                longitude,
                address,
              }});
          })
          // this.setState({ locations: [lastLocation], region });
        }, (error) => {
          setTimeout(() => {
            Alert.alert('Error obtaining current location', JSON.stringify(error));
          }, 100);
        });

    // navigator.geolocation.requestAuthorization();
    // navigator.geolocation.getCurrentPosition(
    //   (position) => {
    //     const self = this;
    //     const { latitude, longitude } = position.coords;
    //     geocoder(latitude, longitude).then(address => {
    //       self.setState({ ...self.state, user: { ...self.state.user,
    //           latitude,
    //           longitude,
    //           address,
    //         }});
    //     })
    //   },
    //   (error) => {
    //     console.log(error);
    //     Alert.alert('Location permisson denied. please try to enable it to continue sign up.')
    //     this.setState({ ...this.state, location_err: error.message })
    //   },
    //   { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    // );
  }

  pickSingleWithCamera(cropping) {
    ImagePicker.openCamera({
      cropping: cropping,
      width: 500,
      height: 500,
      includeExif: true,
    }).then(image => {
      this.setState({ 
        ...this.state,
        image_err: '',
        image: {uri: image.path, width: image.width, height: image.height , type: image.mime, name: image.filename},
      });
    }).catch(e => Alert.alert(e));
  }

  pickSingleBase64(cropit) {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: cropit,
      includeBase64: true,
      includeExif: true,
    }).then(image => {
      this.setState({
        ...this.state,
        image: {uri: `data:${image.mime};base64,`+ image.data, width: image.width, height: image.height, type: image.mime, name: image.filename},
      });
    }).catch(e => Alert.alert(e));
  }

  scaledHeight(oldW, oldH, newW) {
    return (oldH / oldW) * newW;
  }

  selectOption = (index) => {
    if (index == 0) {
      this.pickSingleWithCamera(true);
    } else if (index == 1) {
      this.pickSingleBase64(true);
    }
  }

  render() {
    const buttons = ['Female', 'Male', 'Others'];
    const { gender, first_name, last_name, birthday, email, password, address, latitude, longitude } = this.state.user;
    const { first_name_err, last_name_err, email_err, password_err, address_err, avatar_err, showPreview, isSocialLogin } = this.state;
    const _gender = gender - 1;
    const image = this.state.image;
    const previewImage = this.state.image && this.state.image.uri;

    const behavior = Platform.OS == 'android' ? 'position' : 'padding';

    return (
      <View style={{ flex: 1 }} onStartShouldSetResponder={(e) => Keyboard.dismiss()}>
        <Header
          containerStyle={{
            backgroundColor: colors.pinkColor,
          }} 
          leftContainerStyle= {{
            marginLeft: 20
          }}   
          leftComponent={<Icon name='ios-arrow-back' type='ionicon' size={35} onPress={this.goBack} />}
          centerComponent={{ text: 'User Profile', style: { fontSize: 20, fontWeight: '600' } }}
        />
        <Modal 
          visible={showPreview}
          transparent={true}
          onRequestClose={() => this.setState({ ...this.state, showPreview: false })}>
            <Image style={{width: 300, height: 300, resizeMode: 'contain'}} source={image} />
        </Modal>
        <ActionSheet
            ref={o => this.ActionSheet = o}
            title={'Select option'}
            options={['Open Camera', 'Select from gallery', 'Cancel']}
            cancelButtonIndex={2}
            destructiveButtonIndex={1}
            onPress={(index) =>  this.selectOption(index)}
        />
        {this.props.loading && <LoadingMask /> }
        <TouchableWithoutFeedback style={{ flex: 1 }}  onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.avatarContainer}>
              <Avatar
                size="xlarge"
                rounded
                source={image}
                onPress={() => this.openAvatar()}
                activeOpacity={0.7}
              />
              <TouchableOpacity onPress={() => this.ActionSheet.show()} style={styles.cameraContainer}>
                <Image source={require("../../../assets/icons/icon_camera.png")} />
              </TouchableOpacity>
            </View>
            {avatar_err && <Text style={{ color: 'red' }}>This field is required*</Text>}
             <View style={styles.nameContainer}>
              <Input
                label="First Name"
                shake={true}
                onChangeText={this.onChange("first_name")}
                value={first_name}
                autoCapitalize = 'none'
                containerStyle={styles.inputStyle}
                autoCorrect={false}
                errorStyle={{ color: 'red' }}
                errorMessage={first_name_err}
              />
              <Input
                label="Last Name"
                value={last_name}
                shake={true}
                errorStyle={{ color: 'red' }}
                errorMessage={last_name_err}
                onChangeText={this.onChange("last_name")}
                autoCapitalize = 'none'
                autoCorrect={false}
                containerStyle={styles.inputStyle}
              />
            </View>
            <Input
              label="Insert Email"
              shake={true}
              value={email}
              errorStyle={{ color: 'red' }}
              errorMessage={email_err}
              autoCapitalize='none'
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={this.onChange("email")}
              containerStyle={styles.singleInputStyle}
            />
            { !isSocialLogin && <Input
              label="Create Password"
              shake={true}
              value={password}
              errorStyle={{ color: 'red' }}
              errorMessage={password_err}
              onChangeText={this.onChange("password")}
              autoCapitalize = 'none'
              autoCorrect={false}
              secureTextEntry={true}
              containerStyle={styles.singleInputStyle}
            /> }
            <View style={styles.genderContainer}>
              <Text style={styles.floatingLabel}>Birthday</Text>
              <DatePicker
                style={{ width: '100%'}}
                date={birthday}
                mode="date"
                placeholder="select date"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
                format="MMM DD, YYYY"
                customStyles={{
                  dateInput: {
                    paddingLeft: 8,
                    borderWidth: 0,
                    borderBottomWidth: 1,
                    alignItems: 'flex-start'
                  },
                  dateText: {
                    fontSize: 20,
                  }
                }}
                onDateChange={(date) => {this.onChangeBirthday(date)}}
              />
            </View>
            { latitude != -1 && longitude != -1 &&<View
              style={styles.mapContainer}
            >
              <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                  latitude,
                  longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}>
                <Marker
                  coordinate={{latitude, longitude}}
                />
              </MapView>
                
              </View>}
            <Input
              label="Select your city"
              shake={true}
              editable={false}
              value={address}
              errorStyle={{ color: 'red' }}
              errorMessage={address_err}
              onChangeText={this.onChange("address")}
              autoCapitalize = 'none'
              autoCorrect={false}
              containerStyle={styles.singleInputStyle}
            />
            <View style={styles.mapContainer}>
              
            </View>
            <View style={styles.genderContainer}>
              <Text style={styles.floatingLabel}>Gender</Text>
               <ButtonGroup
                onPress={this.updateIndex}
                selectedIndex={_gender}
                buttons={buttons}
                containerStyle={{ height: 32, width: '100%', marginLeft: 0 }}
                selectedButtonStyle={{ backgroundColor: colors.grayColor }}
              />
            </View>
            <Button 
              buttonStyle={styles.continueButton}
              title="Continue"
              onPress={this.onContinue}
            />
         
          </View>
        </ScrollView>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapContainer: {
    marginTop: 12,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    height: 150,
    width: deviceWidth - 40,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 30,
  },
  cameraContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    marginLeft: -15,
    flexShrink: 0
  },
  inputContainerStyle: {
    paddingLeft: 8,
  },
  inputStyle: {
    flex: 1,
    marginRight: 10,
  },
  singleInputStyle: {
    width: '100%',
    marginTop: 12,
    paddingLeft: 30,
    paddingRight: 30,
  },
  nameContainer: {
    width: '100%',
    marginTop: 8,
    paddingLeft: 30,
    paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  genderContainer: {
    width: '100%',
    paddingLeft: 30,
    paddingRight: 30,
    marginTop: 12,
  },
  floatingLabel: {
    color: colors.floatingColor,
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  continueButton: {
    width: 285,
    height: 45,
    marginTop: 60,
    backgroundColor: colors.primaryColor,
    marginBottom: 15,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
