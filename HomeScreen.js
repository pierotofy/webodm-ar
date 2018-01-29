import React from 'react';
import * as Expo from "expo";
import {
  Text,
  View,
  ScrollView,
  Image,
  TextInput
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

  constructor(){
    super();

    this.state = {
      taskUrl: ""
    };
  }

  // TODO REMOVE
  componentDidMount(){
    this.props.navigation.navigate('ViewModel', {taskUrl: "http://192.168.2.253:8000/public/task/9d720d6e-c50c-4f06-9c2f-bdbc79a43a9a/map/"});
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: "white"}}>
        <ScrollView contentContainerStyle={{alignItems: 'center'}}>
       
        <Text style={{
            fontSize: 28,
            fontWeight: 'bold',
            marginTop: 20
          }}
        >WebODM AR</Text>
        
        <Image
          source={require('./assets/images/logo.png')}
          fadeDuration={0}
          style={{width: 140, height: 140, margin: 0}}
        />
        
        <Button
          style={{marginTop: 20}}
          backgroundColor="#2C3E50"
          rounded={true}
          large={true}
          icon={{name: 'qrcode-scan', type: "material-community"}}
          title='Scan QR Code' 
          onPress={this.handleScanQRCode}/>

        <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            marginTop: 20,
            marginBottom: 20
          }}
        >OR</Text>

        <TextInput
          clearButtonMode="always"
          spellCheck={false}
          value={this.state.taskUrl}
          onChangeText={this.handleTaskUrlChange}
          onSubmitEditing={this.handleTypeURL}
          style={{padding: 8, 
                  alignSelf: "stretch",
                  marginLeft: 40,
                  marginRight: 40, 
                  borderWidth: 1, 
                  borderColor: "#acacac"}}
        />

        <Text style={{
            fontSize: 14,
            marginBottom: 20,
            marginTop: 8,
            color: "#acacac"
          }}
        >https://my.webodm.com/public/task/uuid/
        </Text>

        <Button
          disabled={this.state.taskUrl === ""}
          style={{marginTop: 20}}
          backgroundColor="#2C3E50"
          rounded={true}
          large={true}
          icon={{name: 'keyboard', type: "material-community"}}
          title='Manually Type URL' 
          onPress={this.handleTypeURL}/>
        </ScrollView>
      </View>
    )
  }

  handleTaskUrlChange = (taskUrl) => {
    this.setState({taskUrl});
  }

  handleScanQRCode = () => {
    this.props.navigation.navigate('ScanQR');
  }

  handleTypeURL = () => {
    const { taskUrl } = this.state;
    this.props.navigation.navigate('ViewModel', {taskUrl});
  }
}

export default HomeScreen;