import React, { Component } from 'react';
import { AppRegistry, Button, Text, TextInput, View } from 'react-native';
import AccountManager from '../helpers/accountManager';
import {IAccount} from '../models/IAccount';
import styles from '../styles/accountsStyles';

export default class Accounts extends Component {

  constructor(props) {
    super(props);
    this.state = { accounts: []] };
    const token = AccountManager.readAccounts()
    .then((values: IAccount) => {
      this.setState(accounts: values);
    });
  } 

  render() {
    const emptyText = 'Tap the "+" button in order to create a new account.';
    return(
      <View style={styles.container}>
        <Text style={styles.emptyText}>{emptyText}</Text>
      </View>
    );
  }
}