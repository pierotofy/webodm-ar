import React from 'react';
import HomeScreen from './HomeScreen';
import InstructionsScreen from './InstructionsScreen';

import {
  StackNavigator,
} from 'react-navigation';

import * as Expo from "expo";
import "@expo/vector-icons";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
          isReady: false
        };
    }

    componentWillMount(){
        this.loadFonts();
    }

    async loadFonts() {
        await Expo.Font.loadAsync({
          'Material Design Icons': require("@expo/vector-icons/node_modules/react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf")
        });
        this.setState({ isReady: true });
    }
    render(){
        if (!this.state.isReady) {
          return <Expo.AppLoading />;
        }

        const Stack = StackNavigator({
          Home: {
            screen: HomeScreen,
          },
          Instructions: {
            screen: InstructionsScreen
          }
        });

        return (<Stack />);
    }
}

export default App;
