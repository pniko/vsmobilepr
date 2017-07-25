import React, { Component } from 'react';
import { AppRegistry, Button, Text, TextInput, View } from 'react-native';
import AccountManager from '../helpers/accountManager';
import {IAccount} from '../models/IAccount';
import {CreateAccount} from '../components/createAccount';
import styles from '../styles/accountsStyles';

class AccountState {
  accounts: IAccount[];
  modalVisible: boolean;
}

export default class Accounts extends Component<{}, AccountState> {

  constructor(props) {
    super(props);
    this.state = { accounts: [], modalVisible: false };
    const token = AccountManager.readAccounts()
    .then((values: IAccount) => {
      this.setState({accounts: values} as AccountState );
    });
  } 

  componentDidMount() {
    // update onRightButtonPress func
    this.props.route.onRightButtonPress = this.onRightButtonPress.bind(this);
  }

  render() {
    const emptyText = 'Tap the "Add" button in order to create a new account.';
    return(
      <View>
      <View style={styles.container}>
        <Text style={styles.emptyText}>{emptyText}</Text>
      </View>
      <CreateAccount modalVisible={this.state.modalVisible} />
      </View>
    );
  }
  
  onRightButtonPress() {
    this.setState({modalVisible: true} as AccountState);
  }
}