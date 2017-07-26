/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import {observable} from 'mobx';
import {observer} from 'mobx-react/native';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

@observer export default class ReactNativeMobX extends Component {

  render() {
    return (
      <View />
    );
  }
}

AppRegistry.registerComponent('ReactNativeMobX', () => ReactNativeMobX);
