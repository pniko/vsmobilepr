import React, { Component } from 'react';
import { observer } from 'mobx-react/native';
import { ListView, TextInput, View, Text, Button } from 'react-native';
import TokenManager from '../helpers/tokenManager';
import { SearchListStore, LoadingState } from '../stores/searchListStore';
import styles from '../styles/searchListStyles';

class SearchListProps {
  hasSearch?: boolean;
  store: SearchListStore;
  onSelectRow?: (row) => void;
  renderRow: (any) => any;
}

@observer
export class SearchList extends Component<SearchListProps, {}> {

  render() {
    const { store } = this.props;
    switch (store.loadingState) {
      case LoadingState.Loaded:
        if (store.items && store.items.length > 0) {
          return this.renderList();
        }
        return this.renderEmptyPage();
      case LoadingState.Loading:
        return this.renderLoadingPage();
      case LoadingState.Failed:
        return this.renderEmptyPage();
    }
  }

  renderList(): any {
    const { store, renderRow } = this.props;
    return (
      <View style={styles.listcontainer}>
        {this.props.hasSearch ? (
          <TextInput
            style={styles.searchBar}
            value={store.filterTerm}
            onChange={(text) => store.setFilterTerm(text.nativeEvent.text)}
            placeholder='Search' />
        ) : null}
        <ListView
          style={styles.list}
          dataSource={store.datasource}
          renderRow={renderRow}
        />
      </View>
    );
  }

  renderEmptyPage(): any {
    const { store } = this.props;
    return (
      <View style={styles.container}>
        <Text>No items available...</Text>
        <Button
          onPress={this.onReloadButtonClicked.bind(this)}
          title='Reload'
        />
      </View>
    );
  }

  renderLoadingPage(): any {
    const { store } = this.props;
    return (
      <View style={styles.container}>
        <Text>Loading content...</Text>
      </View>
    );
  }

  onReloadButtonClicked(): void {
    this.props.store.fetchData();
  }
}
