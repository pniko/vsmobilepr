import React, { Component } from 'react';
import { Modal, NavigatorIOS, Text, TextInput, TouchableHighlight, View } from 'react-native';
import styles from '../styles/createAccountStyles';
import { IAccount } from '../models/IAccount';

class CreateAccountProps {
  modalVisible: boolean;
  onAccountSaved?: (account: IAccount) => void;
  onAccountCanceled?: () => void;
}

class CreateAccountState {
  accountName: string;
  accessToken: string;
}

export class CreateAccount extends Component<CreateAccountProps, CreateAccountState> {

  constructor(props) {
    super(props);
    this.state = {
      accountName: '',
      accessToken: ''
    };
  }

  render() {
    const { modalVisible, onAccountSaved, onAccountCanceled } = this.props;
    return (
      <View>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.props.modalVisible}
          onRequestClose={() => { }}
        >
          <NavigatorIOS
            initialRoute={{
              component: Empty,
              title: 'Create Account',
              rightButtonTitle: 'Save',
              onRightButtonPress: () => {
                if (onAccountSaved) {
                  onAccountSaved({
                    name: this.state.accountName,
                    token: this.state.accessToken
                  })
                }
              },
              leftButtonTitle: 'Cancel',
              onLeftButtonPress: () => {
                if (onAccountSaved) {
                  onAccountCanceled()
                }
              }
            }}
          />
          <View style={styles.container}>
            <View style={styles.inputGroupContainer}>
              <Text style={styles.label}>Account Name</Text>
              <TextInput style={styles.input} onChangeText={(text) => this.setState({ accountName: text })} value={this.state.accountName} />
            </View>
            <View style={styles.inputGroupContainer}>
              <Text style={styles.label}>Access Token</Text>
              <TextInput style={styles.input} onChangeText={(text) => this.setState({ accessToken: text })} value={this.state.accessToken} />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

class Empty extends Component {

  render() {
    return (
      <View style={{flex:1}}/>
    );
  }
}