import React, { Component } from 'react';
import { AppRegistry, Button, Text, TextInput, View } from 'react-native';
import TokenManager from '../helpers/tokenManager';
import styles from '../styles/loginStyles';

class LoginState {
  text: string
}

class LoginProps {
  onLoginClicked?: () => void;
}

export default class Login extends Component<LoginProps, LoginState> {

  constructor(props) {
    super(props);
    this.state = { text: '' };
    const token = TokenManager.readToken()
      .then((token: string) => {
        if (token !== null) {
          this.setState({ text: token || '' })
        }
      });
  } 

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder='VSTS Access Token'
          value={this.state.text}
          onChangeText={(text) => {
            this.setState({ text: text });
          }}
        />
        <Button
          onPress={this.onLoginButtonPressed.bind(this)}
          title='Login'
          disabled={this.state.text === ''}
        />
      </View>
    );
  }

  async onLoginButtonPressed() {
    await TokenManager.saveToken(this.state.text);
    this.props.onLoginClicked();
    console.log('Login pressed')
  }
}
