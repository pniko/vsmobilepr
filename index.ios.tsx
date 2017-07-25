/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import { observable } from 'mobx';
import { observer } from 'mobx-react/native';
import Accounts from './app/components/accounts';
import Teams from './app/components/teams';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  NavigatorIOS
} from 'react-native';

@observer export default class VsMobilePR extends Component {

  private pushedComponent: any;

  render() {
      return <NavigatorIOS
        initialRoute={{
          component: Accounts,
          title: 'Accounts',
          rightButtonTitle: 'Add',
          passProps: {
            ref: (component) => {this.pushedComponent = component},
          },
          onRightButtonPress: () => {
           // call func
          this.pushedComponent && this.pushedComponent.onRightButtonPress();
          }
        }}
        style={{ flex: 1 }}
      />
  }
}

AppRegistry.registerComponent('VsMobilePR', () => VsMobilePR);
