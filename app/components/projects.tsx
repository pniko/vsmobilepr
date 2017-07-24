import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SearchList } from './searchList';
import { ProjectsStore } from '../stores/projectsStore';
import { ListRow } from './listRow';
import { observer } from 'mobx-react/native';
import styles from '../styles/searchListStyles';

@observer
export default class Projects extends Component {

  private store: ProjectsStore;

  constructor() {
    super();
    this.store = new ProjectsStore();
  }

  componentDidMount() {
    this.store.fetchData();
  }

  render() {
    return (
      <SearchList
        store={this.store}
        hasSearch={true}
        renderRow={(rowData) => <ListRow title={rowData} />}
      />
    );
  }
}
