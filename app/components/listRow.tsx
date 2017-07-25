import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import styles from '../styles/listRowStyles';

class ListRowProps {
  title: string;
  onRowPressed: (row: string) => (void);
}

export class ListRow extends Component<ListRowProps, {}> {

  render() {
    return (
        <TouchableHighlight style={styles.container} onPress={() => this.onRowPressed()} underlayColor="white">
          <Text style={styles.text}>{this.props.title}</Text>
        </TouchableHighlight>
    );
  }

  private onRowPressed() {
    this.props.onRowPressed(this.props.title)
  }
}
