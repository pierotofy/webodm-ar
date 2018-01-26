import React from 'react';
import HomeScreen from './HomeScreen';
import {
  StackNavigator,
} from 'react-navigation';

export default StackNavigator({
  Home: {
    screen: HomeScreen,
  },
});
