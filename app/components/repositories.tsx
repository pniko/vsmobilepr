import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SearchList } from './searchList';
import { LoadingState } from '../stores/searchListStore';
import { RepositoriesStore } from '../stores/repositoriesStore';
import { ListRow } from './listRow';
import { observer } from 'mobx-react/native';
import { observable } from 'mobx'
import styles from '../styles/searchListStyles';

class RepositoriesProps {
    projectName: string;
    teamName?: string;
}

@observer
export class Repositories extends Component<RepositoriesProps, {}> {

  private store: RepositoriesStore;
  @observable selectedRepositoryName: string;

  constructor() {
    super();
    this.store = new RepositoriesStore();
  }

  componentDidMount() {
    this.store.fetchRepositories(this.props.projectName, this.props.teamName);
  }

  render() {
    if (this.store.loadingState === LoadingState.Loaded && this.props.projectName) {
      return (<View />)
    } else {
      return (<SearchList
        store={this.store}
        hasSearch={true}
        renderRow={(rowData) => <ListRow title={rowData} onRowPressed={(repositoryName) => this.onRepositorySelected(repositoryName)} />}
      />);
    }
  }

  private onRepositorySelected(repositoryName: string) {
    this.selectedRepositoryName = repositoryName;
  }
}
