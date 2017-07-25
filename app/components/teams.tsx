import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SearchList } from './searchList';
import { LoadingState } from '../stores/searchListStore';
import { TeamsStore } from '../stores/teamsStore';
import { ListRow } from './listRow';
import { observer } from 'mobx-react/native';
import { observable } from 'mobx'
import styles from '../styles/searchListStyles';

class TeamsProps {
    projectName: string;
}

@observer
export class Teams extends Component<TeamsProps, {}> {

  private store: TeamsStore;

  constructor() {
    super();
    this.store = new TeamsStore();
  }

  componentDidMount() {
    this.store.fetchTeams(this.props.projectName);
  }

  render() {
      return (<SearchList
        store={this.store}
        renderRow={(rowData) => <ListRow title={rowData} onRowPressed={(teamName) => this.onTeamSelected(teamName)} />}
      />);
  }

  private onTeamSelected(teamName: string) {
    // const nextRoute = {
    //   component: Teams,
    //   title: projectName,
    //   passProps: { projectName: projectName }
    // };
    // this.props.navigator.push(nextRoute);
  }
}
