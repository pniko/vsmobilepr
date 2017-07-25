import React, { Component } from 'react';
import { AppRegistry, Button, Text, TextInput, View } from 'react-native';
import AccountManager from '../helpers/accountManager';
import { IAccount } from '../models/IAccount';
import { CreateAccount } from '../components/createAccount';
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
      .then((values: IAccount[]) => {
        this.setState({ accounts: values } as AccountState);
      });
    ;
  }

  componentDidMount() {
    // update onRightButtonPress func
    this.props.route.onRightButtonPress = this.onRightButtonPress.bind(this);
  }

  render() {
    const emptyText = 'Tap the "Add" button in order to create a new account.';
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.emptyText}>{emptyText}</Text>
        </View>
        <CreateAccount modalVisible={this.state.modalVisible} onAccountSaved={this.onAccountSaved.bind(this)} onAccountCanceled={this.onAccountCanceled.bind(this)} />
      </View>
    );
  }

  onRightButtonPress() {
    this.setState({ modalVisible: true } as AccountState);
  }

  onAccountSaved(account: IAccount): void {
    this.setState({ modalVisible: false } as AccountState);
  }

  onAccountCanceled(): void {
    this.setState({ modalVisible: false } as AccountState);
  }
}