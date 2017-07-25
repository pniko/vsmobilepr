import React, { Component } from 'react';
import Prompt from 'react-native-prompt';
import SourceDiff from './sourceDiff';
import {
  AppRegistry,
  StyleSheet,
  Text,
  ScrollView,
  View,
  Dimensions,
  FlatList
} from 'react-native';

var { height } = Dimensions.get('window');
 
var box_count = 3;
var box_height = height * .10;
var body_height = height * .90;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  box: {
    height: box_height
  },
  header: {
    backgroundColor: '#2196F3',
    paddingLeft: 15
  },
  body: {
    backgroundColor: '#8BC34A',
    height: body_height
  }
});

export default class SourceView extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            promptVisible: false
        };
    }
    render() {
    
    let baseText = "row1-A\nrow2-A\nrow3-A\nrow4-A\nrow5-A\nrow6-A\nrow7-A\nrow8-A\nrow9-A\nrow10-A\nrow1-A\nrow2-A\nrow3-A\nrow4-A\nrow5-A\nrow6-A\nrow7-A\nrow8-A\nrow9-A\nrow10-A\nrow1-A\nrow2-A\nrow3-A\nrow4-A\nrow5-A\nrow6-A\nrow7-A\nrow8-A\nrow9-A\nrow10-A";
    let newText = "row1-A\nrow2-A\nrow3-B\nrow4-A\nrow5-A\nrow6-B\nrow7-A\nrow8-A\nrow9-B\nrow10-A\nrow1-A\nrow2-A\nrow3-B\nrow4-A\nrow5-A\nrow6-B\nrow7-A\nrow8-A\nrow9-B\nrow10-A\nrow1-A\nrow2-A\nrow3-B\nrow4-A\nrow5-A\nrow6-B\nrow7-A\nrow8-A\nrow9-B\nrow10-A";


        return (
            <View  style={{ alignSelf: 'stretch' }}>
                <View style={styles.container}>
                    <View style={[styles.box, styles.header]}>
                        <Text style={{ fontSize: 30, paddingLeft: 20, paddingTop: 20 }}>SampleFile.ts</Text>
                    </View>
                    <View style={[styles.box, styles.body]}>
                        <SourceDiff baseTextLines={baseText} newTextLines={newText} />
                    </View>
                </View>
            </View>);
    }
};