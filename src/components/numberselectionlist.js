import React from 'react';
import { FlatList, TouchableOpacity, Text, View } from 'react-native';

import colors   from '../const/colors';

 class MyListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    const textColor = this.props.selected ? "black" : "gray";
    const borderColor = this.props.selected ? colors.borderColor : 'transparent';
    const borderBottomWidth = this.props.selected ? 2 : 0;
    return (
      <TouchableOpacity style={{ marginRight: 30 }} onPress={this._onPress}>
        <View style={{ borderBottomWidth: 2, borderColor }}>
          <Text style={{ color: textColor, fontSize: 20 }}>
            {this.props.title}
          </Text>
          
        </View>
      </TouchableOpacity>
    );
  }
}

export default class NumberSelectionList extends React.PureComponent {
  state = {selected: 5};

  _keyExtractor = (item, index) => index;

  _onPressItem = (id: string) => {
    // updater functions are preferred for transactional updates
    this.setState({ selected: id });
  };

  _renderItem = ({item, index}) => (
    <MyListItem
      id={index}
      onPressItem={this._onPressItem}
      selected={this.state.selected == index}
      title={item}
    />
  );

  render() {
    return (
      <FlatList
        horizontal={true}
        data={this.props.data}
        extraData={this.state}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    );
  }
}