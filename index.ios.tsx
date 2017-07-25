/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import { observable } from 'mobx';
import { observer } from 'mobx-react/native';
import Login from './app/components/login';
import Projects from './app/components/projects';
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

  @observable showLogin = true;

  render() {
    if (this.showLogin) {
      return <Login onLoginClicked={() => { this.showLogin = false;}}/>
    } else {
      return <Projects />
    }
  }
}

AppRegistry.registerComponent('VsMobilePR', () => VsMobilePR);
