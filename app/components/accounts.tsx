import React, { Component } from 'react';
import { AppRegistry, Button, Text, TextInput, View, FlatList } from 'react-native';
import AccountManager from '../helpers/accountManager';
import { IAccount } from '../models/IAccount';
import { CreateAccount } from '../components/createAccount';
import { ListRow } from './listRow';
import Projects from '../components/projects';
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

    return (
      <View style={styles.container}>
        {this.state.accounts && this.state.accounts.length > 0 ? this.renderList() : this.renderEmptyText()}
        <CreateAccount modalVisible={this.state.modalVisible} onAccountSaved={this.onAccountSaved.bind(this)} onAccountCanceled={this.onAccountCanceled.bind(this)} />
      </View>
    );
  }

  renderList(): JSX.Element {
    return (
      <View style={styles.listcontainer}>
        <FlatList
          style={styles.list}
          data={this.state.accounts}
          renderItem={({ item }) => <ListRow title={item.name} onRowPressed={(projectName) => this.onProjectSelected(projectName)} />}
        />
      </View>
    );
  }

  renderEmptyText(): JSX.Element {
    const emptyText = 'Tap the "Add" button in order to create a new account.';
    return (
      <View>
        <Text style={styles.emptyText}>{emptyText}</Text>
      </View>
    );
  }

  onRightButtonPress() {
    this.setState({ modalVisible: true } as AccountState);
  }

  async onAccountSaved(account: IAccount): Promise<void> {
    await AccountManager.saveAccount(account)
    const accounts = await AccountManager.readAccounts()
    this.setState({ accounts: accounts, modalVisible: false });
  }

  onAccountCanceled(): void {
    this.setState({ modalVisible: false });
  }

  onProjectSelected(projectName: string) {
    const nextRoute = {
      component: Projects,
      title: projectName,
      passProps: { projectName: projectName }
    };
    this.props.navigator.push(nextRoute);
  }
}