import React from 'react';
import {
  View, Text
} from 'react-native';

class ViewModelScreen extends React.Component {
  static navigationOptions = {
    title: 'View Model'
  };

  constructor() {
    super();

  }

  render() {
    const { params } = this.props.navigation.state;

    return (
      <View style={{ flex: 1 }}>
        <Text>{params.taskUrl}</Text>
      </View>
    );
  }
}

export default ViewModelScreen;