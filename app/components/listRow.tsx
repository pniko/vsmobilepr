import React, { Component } from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/listRowStyles';

class ListRowProps {
  title: string;
}

export class ListRow extends Component<ListRowProps, {}> {

  render() {
    return (
      <View style={styles.container} >
        <Text style={styles.text}>{this.props.title}</Text>
      </View>
    );
  }
}
