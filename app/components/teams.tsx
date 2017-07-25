import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { SearchList } from './searchList';
import { LoadingState } from '../stores/searchListStore';
import { TeamsStore } from '../stores/teamsStore';
import { Repositories } from './repositories';
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
    private _projectName: string;
    @observable selectedTeamName: string;

    constructor() {
        super();
        this.store = new TeamsStore();
    }

    componentDidMount() {
        this._projectName = this.props.projectName;
        this.store.fetchTeams(this._projectName);
    }

    render() {
        if (this.store.loadingState === LoadingState.Loaded && this.selectedTeamName) {
            return (<Repositories projectName={this._projectName} teamName={this.selectedTeamName} />)
        } else {
            return (<SearchList
                store={this.store}
                hasSearch={true}
                renderRow={(rowData) => <ListRow title={rowData} onRowPressed={(teamName) => this.onTeamSelected(teamName)} />}
            />);
        }
    }

    private onTeamSelected(teamName: string) {
        this.selectedTeamName = teamName;
    }
}
