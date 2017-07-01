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
  @observable counter = 1;

  addOne(){
    this.counter += 1;
  }

  subtractOne(){
    this.counter -= 1;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {this.counter}
        </Text>
        <Button title="Add" onPress={() => this.addOne()} />
        <Button title="subtract" onPress={() => this.subtractOne()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('ReactNativeMobX', () => ReactNativeMobX);
