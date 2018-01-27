import React from 'react';
import {
  View, Text, StyleSheet, Image
} from 'react-native';
import { BarCodeScanner, Permissions } from 'expo';

class ScanQRScreen extends React.Component {
  static navigationOptions = {
    title: 'Scan QR Code'
  };

  constructor() {
    super();

    this.state = {
      hasCameraPermission: null
    }
  }

  componentDidMount() {
    this.requestCameraPermission();
  }

  handleQRCodeRead = ({type, data}) => {
    this.props.navigation.goBack(null);
    this.props.navigation.navigate('ViewModel', {taskUrl: data});
  };

  requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1,
          justifyContent: 'center',
          alignItems: 'center'}}>
          <BarCodeScanner
            barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
            onBarCodeRead={this.handleQRCodeRead}
            style={StyleSheet.absoluteFill}
          />
          <Image
            style={{flex: 0.5}}
            resizeMode="contain"
            source={require('./assets/images/focus-square.png')}
          />
        </View>
      );
    }
  }
}

export default ScanQRScreen;