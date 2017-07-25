import React, { Component } from 'react';
import { Modal, Text, TextInput, TouchableHighlight, View } from 'react-native';
import styles from '../styles/createAccountStyles';

class CreateAccountProps {
  modalVisible: boolean;
  onAccountSaved?: () => void;
  onAccountCaneled?: () => void;
}

class CreateAccountState {
  accountName: string;
  accessToken: atring;
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
    const {modalVisible, onAccountSaved, onAccountCaneled} = this.props;
    return (
      <View style={{marginTop: 22}}>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.props.modalVisible}
          onRequestClose={() => {}}
          >
          <View style={styles.inputGroupContainer}>
            <Text style={styles.label}>Account Name</Text>
            <TextInput style={styles.input} onChangeText={(text) => this.setState({accountName: text})} value={this.state.accountName} />
          </View>
          <View style={styles.inputGroupContainer}>
            <Text style={styles.label}>Access Token</Text>
            <TextInput style={styles.input} onChangeText={(text) => this.setState({accessToken: text})} value={this.state.accessToken} />
          </View>
        </Modal>
      </View>
    );
  }
}