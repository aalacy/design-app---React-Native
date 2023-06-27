import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import colors from '../const/colors';

class StyleSheetFactory {
    static getSheet(marginTop = 0) {
        return StyleSheet.create({
            logoContainer: {
              justifyContent: 'center',
              alignItems: 'center',
              marginTop,
            },
            text: {
              color: colors.whiteColor,
              fontSize: 18,
            },
            logoTitle: {
              fontSize: 30,
              fontWeight: 'bold',
              textAlign: 'center',
            }
        })
    }
}

export default Logo = ({marginTop}) => {
  let myStyleSheet = StyleSheetFactory.getSheet(marginTop)
  return(
      <View style={myStyleSheet.logoContainer}>
        <Image source={require('../../assets/images/logo_.png')}/>
      </View>
  )
}
