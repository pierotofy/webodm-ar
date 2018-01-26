import React from 'react';
import * as Expo from "expo";
import {
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native';

import "@expo/vector-icons";
import { Button } from 'react-native-elements';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'WebODM AR'
  };

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

  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }

    return (
      <View style={{alignItems: 'center', 
                    flex: 1,
                    backgroundColor: 'white'}}>

        <Image
          source={require('./assets/images/logo.png')}
          fadeDuration={0}
          style={{width: 140, height: 140, margin: 20}}
        />
        <Text style={{
            fontSize: 20,
            padding: 20,
            width: '96%'
          }}
        >View textured models processed with WebODM in augmented reality on ARKit devices. To get started:</Text>
        
        <Text style={styles.instruction}>1. Make sure WebODM is accessible from the internet or that your device is connected to the same network as the computer running WebODM.</Text>
        <Text style={styles.instruction}>2. Make sure the task you want to display is shared.</Text>
        <Text style={styles.instruction}>3. Press the "QR" button from WebODM's share panel.</Text>
      
        <Button
          style={{marginTop: 40}}
          rounded={true}
          large={true}
          icon={{name: 'qrcode-scan', type: "material-community"}}
          title='Scan QR Code' 
          onPress={this.handlePress}/>
      </View>
    )
  }

  handlePress = () => {
    this.props.navigation.navigate('Home');
  }
}

const styles = StyleSheet.create({
  instruction: {
    fontSize: 18,
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 20,
    paddingRight: 20,
    width: '96%'
  }
});

export default HomeScreen;