import React, { Component } from 'react';
import { AppRegistry, Button, Text, TextInput, View } from 'react-native';
import TokenManager from '../helpers/tokenManager';
import styles from '../styles/loginStyles';

class LoginState {
  text: string
}

export default class Login extends Component<{}, LoginState> {

  constructor(props) {
    super(props);
    this.state = { text: '' };
    const token = TokenManager.readToken()
      .then((token: string) => {
        if (token !== null) {
          this.setState({ text: token })
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
          onChangeText={async (text) => {
            console.log(text + "HAHA");
            this.setState({ text: text });
            await TokenManager.saveToken(text);
          }}
        />
        <Button
          onPress={this.onLoginButtonPressed}
          title='Login'
          disabled={this.state.text === ''}
        />
      </View>
    );
  }

  onLoginButtonPressed(): void {
    console.log('Login pressed')
  }
}
