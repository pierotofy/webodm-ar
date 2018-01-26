import React from 'react';
import * as Expo from "expo";
import {
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native';

import { Button, Icon } from 'react-native-elements';

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: '',
    headerRight: <Icon 
            name="information"
            type="material-community"
            size={32}
            color="#2C3E50"
            iconStyle={{paddingRight: 20}}
            onPress={() => navigation.navigate('Instructions') }
          />
  });

  render() {
    return (
      <View style={{alignItems: 'center', 
                    flex: 1,
                    backgroundColor: 'white'}}>

        <Text style={{
            fontSize: 28,
            fontWeight: 'bold',
            marginTop: 20
          }}
        >WebODM AR</Text>
        
        <Image
          source={require('./assets/images/logo.png')}
          fadeDuration={0}
          style={{width: 140, height: 140, margin: 20}}
        />
        
        <Button
          style={{marginTop: 20}}
          backgroundColor="#2C3E50"
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