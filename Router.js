import React from 'react';
import { bindActionCreators } from 'redux';
import { connect }  from 'react-redux';
import { View, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { createStackNavigator, createAppContainer, createBottomTabNavigator, createSwitchNavigator, createDrawerNavigator } from 'react-navigation';
import normalize    from './src/helpers/sizeHelper';

import First        from './src/screens/auth/first';

import LogIn        from  './src/screens/auth/login';
import SignUp       from  './src/screens/auth/signup';
import Intro        from  './src/screens/auth/intro';
import UserProfile  from  './src/screens/auth/userprofile';
import UserDetail       from  './src/screens/auth/userdetail';
import UserDetailFemale from './src/screens/auth/userdetailfemale';
import UserDetailMale   from './src/screens/auth/userdetailmale';

import Home         from  './src/screens/main/home';
import Wardrobe     from  './src/screens/main/wardrobe';
import Statistic    from  './src/screens/main/statistic';
import Favourite    from  './src/screens/main/favourite';
import Menu         from  './src/screens/main/menu';

import colors       from './src/const/colors';

const AuthStack = {
  Intro: { screen: Intro, navigationOptions: {
      gesturesEnabled: false,
    }},
  LogIn: { screen: LogIn, navigationOptions: {
      gesturesEnabled: false,
    }},
  SignUp: { screen: SignUp, navigationOptions: {
      gesturesEnabled: false,
    } },
  UserProfile: { screen: UserProfile, navigationOptions: {
      gesturesEnabled: false,
    } },
  UserDetail: { screen: UserDetail, navigationOptions: {
      gesturesEnabled: false,
    }},
  UserDetailFemale: { screen: UserDetailFemale,  navigationOptions: {
      gesturesEnabled: false,
    }},
  UserDetailMale: { screen: UserDetailMale, navigationOptions: {
      gesturesEnabled: false,
    }},
};

const mainBottomTabNavigator = createBottomTabNavigator({
  Home: { 
    screen: Home,
    navigationOptions: () => ({
            tabBarIcon: ({tintColor}) => (
                <Icon
                    name="home"
                    color={tintColor}
                    size={24}
                />
            )
        })
  },
  Wardrobe: { 
    screen: Wardrobe,
    navigationOptions: () => ({
            tabBarIcon: ({tintColor}) => (
                <Image
                    source={require('./assets/icons/wardrobe.png')}
                    color={tintColor}
                    size={24}
                />
            )
        })
  },
  Statistic: { 
    screen: Statistic,
    navigationOptions: () => ({
        tabBarIcon: ({tintColor}) => (
            <Image
                source={require('./assets/icons/statistic.png')}
                color={tintColor}
                size={24}
            />
        )
    })
  },
  Favourite: { 
    screen: Favourite,
    navigationOptions: () => ({
            tabBarIcon: ({tintColor}) => (
                <Icon
                    type="evilicon"
                    name="heart"
                    color={tintColor}
                    size={24}
                />
            )
        })
  },
}, {
    tabBarOptions: {
        activeTintColor: colors.primaryColor, // active icon color
        inactiveTintColor: colors.blackColor,
        style: {
          backgroundColor: colors.grayColor,
        },
    },
});

const IntroNavigator = createStackNavigator({
  ...AuthStack,
}, {
    headerMode: 'none',
});

const DrawerStack = createStackNavigator({
  Menu: { screen: Menu }
}, {
    headerMode: 'none',
});

const IntroContainer = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: First,
    App: mainBottomTabNavigator,
    Auth: IntroNavigator,
    Menu: DrawerStack,
  },
  {
    headerMode: 'none',
    initialRouteName: 'AuthLoading',
  }
));

const mapDispatchToProps = (dispatch) => {
	return ({
	});
}

const mapStateToProps = (state) => {
	return ({
	});
}

class Router extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const { loading, isFirstLaunch } = this.state;
    return (
      <IntroContainer />
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Router);
