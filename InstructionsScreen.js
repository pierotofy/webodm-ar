import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet
} from 'react-native';

class instructionsScreen extends React.Component {
  static navigationOptions = {
    title: 'Instructions'
  };

  constructor() {
    super();
  }

  render() {
    return (
      <View style={{alignItems: 'center', 
                    flex: 1,
                    backgroundColor: 'white'}}>
        <Text style={{
            fontSize: 20,
            padding: 20,
            width: '96%'
          }}
        >This app allows you to view textured models processed with WebODM in augmented reality on ARKit devices. To get started:</Text>
        
        <Text style={styles.instruction}>1. Make sure WebODM is accessible from the internet or that your device is connected to the same network as the computer running WebODM.</Text>
        <Text style={styles.instruction}>2. Make sure WebODM is currently running using a secure (HTTPS) connection. The app cannot load assets from a non-secure installation of WebODM.</Text>
        <Text style={styles.instruction}>3. Make sure the task you want to display is shared.</Text>
        <Text style={styles.instruction}>4. Press the "QR" button from WebODM's share panel:</Text>
        
        <Image
          source={require('./assets/images/webodm-qr.png')}
          resizeMode="contain"
          style={{margin: 20}}
          />

        <Text style={styles.instruction}>5. Scan the QR code using this app. Alternatively you can also manually type the URL of the shared task.</Text>
      </View>
    )
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

export default instructionsScreen;